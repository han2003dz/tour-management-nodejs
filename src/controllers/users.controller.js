const bcrypt = require("bcrypt");
const Users = require("../models/user.model");
const Roles = require("../models/role.model");
const Tours = require("../models/tours.model");
const Booking = require("../models/booking.model");
const Cart = require("../models/cart.model");
const systemConfig = require("../config/system");
const generateHelper = require("../helpers/generate");
const ForgotPassword = require("../models/forgot-password");
const sendMailHelper = require("../helpers/sendMail");
const moment = require("moment");

const createPost = async (req, res) => {
  try {
    const emailExist = await Users.findOne({
      email: req.body.email,
      deleted: false,
    });

    if (emailExist) {
      req.flash("error", `Email ${req.body.email} đã tồn tại`);
      res.redirect("back");
    } else {
      const user = new Users(req.body);
      await user.save();
      req.flash("success", "Thêm tài khoản thành công");
      res.redirect(`${systemConfig.prefixAdmin}/users`);
    }
  } catch (error) {
    console.log(error);
    req.flash("success", "Thêm tài khoản thất bại");
    res.redirect(`${systemConfig.prefixAdmin}/users`);
  }
};

const editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    const emailExist = await Users.findOne({
      _id: { $ne: id },
      email: req.body.email,
      isLocked: false,
    });
    if (emailExist) {
      req.flash("error", "Email đã tồn tại!");
    } else {
      if (req.body.password) {
        req.body.password = md5(req.body.password);
      } else {
        delete req.body.password;
      }
    }
    await Users.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhât thông tin cá nhân thành công!");
  } catch (error) {
    console.log(error);
    req.flash("error", "Cập nhât thông tin cá nhân thất bại!");
  } finally {
    res.redirect("back");
  }
};

const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await Users.findOne({
      email,
      deleted: false,
    });
    if (!user) {
      res.json({
        code: 300,
        message: "Email không hợp lệ",
      });
      return;
    }
    const otp = generateHelper.generateRandomNumber(6);
    const objectForgotPassword = {
      email,
      otp,
      expireAt: Date.now(),
    };
    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();
    const subject = "Mã OTP xác minh lấy mật khẩu: ";
    const html = `
    Mã OTP để lấy lại mật khẩu là <b>${otp}</b>`;
    sendMailHelper.sendMail(email, subject, html);
    res.json({
      code: 200,
      message: "Thành công",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Tạm thời không thể truy cập !",
      error,
    });
    console.log(error);
  }
};

const otpPost = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const data = await ForgotPassword.findOne({
      email,
      otp,
    });
    if (!data) {
      res.json({
        code: 300,
        message: "OTP không hợp lệ",
      });
    }
    res.json({
      code: 200,
      message: "OTP hợp lệ",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Lỗi 404",
    });
    console.log(error);
  }
};

const resetPasswordPost = async (req, res) => {
  try {
    const { password, email } = req.body;
    await Users.updateOne(
      {
        email,
      },
      {
        password,
      }
    );
    res.json({
      code: 200,
      message: "Cập nhật mật khẩu thành công",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Cập nhật mật khẩu thất bại",
    });
  }
};

const lookUpBill = async (req, res) => {
  try {
    function formatCurrency(value) {
      return value.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    }
    const { code, email } = req.query;
    const [user, booking] = await Promise.all([
      Users.findOne({ email, deleted: false }),
      Booking.findOne({ code }),
    ]);
    if (!user) {
      res.json({
        code: 300,
        message: "Email không hợp lệ",
      });
      return;
    }
    const cart = await Cart.findOne({ user_id: user.id });

    if (!cart || (!booking || cart.id !== booking.cart_id)) {
      res.json({
        code: 300,
        message: "Mã order không chính xác",
      });
      return;
    }
    const subject = "Hoá đơn";
    const html = `
      <h1>Công ty du lịch VN TOURISM</h1>
      <p>Địa chỉ: Cầu Diễn, Nam Từ Liêm, Tp.Hà Nội</p>
      <p>Điện thoại: 0389843271</p>
      <hr></hr>
      <p>Tên khách hàng: ${user.username}</p>
      <p>Số điện thoại: ${user.phone}</p>
  
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 18px; text-align: left;">
        <thead>
          <tr>
            <th style="padding: 12px; border: 1px solid #dddddd; background-color: #f2f2f2;">Tên tour</th>
            <th style="padding: 12px; border: 1px solid #dddddd; background-color: #f2f2f2;">Số lượng người lớn</th>
            <th style="padding: 12px; border: 1px solid #dddddd; background-color: #f2f2f2;">Số lượng trẻ em</th>
            <th style="padding: 12px; border: 1px solid #dddddd; background-color: #f2f2f2;">Ngày đi</th>
            <th style="padding: 12px; border: 1px solid #dddddd; background-color: #f2f2f2;">Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 12px; border: 1px solid #dddddd;">${
              booking.tourInfo.title
            }</td>
            <td style="padding: 12px; border: 1px solid #dddddd;">${
              booking.tourInfo.quantityAdult
            }</td>
            <td style="padding: 12px; border: 1px solid #dddddd;">${
              booking.tourInfo.quantityChild
            }</td>
            <td style="padding: 12px; border: 1px solid #dddddd;">${moment(
              booking.tourInfo.expectedDate
            ).format("DD/MM/YYYY")}</td>
            <td style="padding: 12px; border: 1px solid #dddddd;">${formatCurrency(
              booking.tourInfo.amountPaid
            )}</td>
          </tr>
        </tbody>
      </table>
    `;
    sendMailHelper.sendMail(email, subject, html);
    res.json({
      code: 200,
      message: "Thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: "An error occurred",
    });
  }
};

module.exports = {
  createPost,
  editPatch,
  forgotPassword,
  otpPost,
  resetPasswordPost,
  lookUpBill,
};
