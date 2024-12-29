const Cart = require("../models/cart.model");
const Tours = require("../models/tours.model");
const Booking = require("../models/booking.model");
const { paymentUrl } = require("../helpers/paymentUrl");
const { sortObject } = require("../helpers/sortVnp");
const { generateOrderCode } = require("../helpers/generateCode");

const vnpReturn = async (req, res) => {
  try {
    let vnp_Params = req.query;
    let secureHash = vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];
    vnp_Params = sortObject(vnp_Params);
    let secretKey = process.env.vnp_HashSecret;
    let querystring = require("qs");
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    if (secureHash === signed) {
      req.flash("success", "Hệ thống đã xác nhận bạn thanh toán online");
      res.redirect("/");
    } else {
      req.flash("error", "Thanh toán thất bại");
      res.redirect("back");
    }
  } catch (error) {
    console.log("error vnpReturn: ", error);
    req.flash("error", "Thanh toán thất bại");
    res.redirect("back");
  }
};

const checkout = async (req, res) => {
  try {
    const cartTourId = req.cookies.cartTourId;
    const tourId = req.params.tourId;
    const transactionType = req.body.bankCode;
    const amountPaid = parseInt(req.body.amount);
    const userInfo = {
      username: req.body.username,
      phone: req.body.phone,
      note: req.body.note,
    };
    const cart = await Cart.findOne({
      _id: cartTourId,
    });

    const tour = cart.tours.find((tour) => tour.tour_id === tourId);
    let tourInfo = {};
    if (tour) {
      const dataTour = await Tours.findOne({ _id: tourId });
      if (dataTour) {
        const objectTour = {
          tourId: tour.tour_id,
          title: dataTour.title,
          amountPaid,
          discountPercentage: dataTour.discountPercentage,
          quantityAdult: tour.quantityAdult,
          quantityChild: tour.quantityChild,
          expectedDate: tour.expectedDate,
          image: dataTour.images[0],
          numberOfDays: dataTour.numberOfDays,
        };
        tourInfo = Object.assign({}, objectTour);
      } else {
        req.flash("error", "Tour không tồn tại");
      }
    } else {
      req.flash("error", "Bạn chưa thêm tour này vào giỏ hàng");
    }
    let status = transactionType == "CASH" ? "unpaid" : "paid";
    const countOrder = await Booking.countDocuments();
    const code = generateOrderCode(countOrder + 1);
    const orderInfo = {
      cart_id: cartTourId,
      userInfo,
      tourInfo,
      transactionType,
      status,
      code,
    };
    const booking = new Booking(orderInfo);
    await booking.save();

    await Cart.findOneAndUpdate(
      { _id: cartTourId },
      { $pull: { tours: { tour_id: tourId } } },
      { new: true }
    );
    await Tours.findOneAndUpdate(
      { _id: tourId },
      {
        $inc: { stock: -1, bookingCount: +1 },
      },
      { new: true }
    );
    if (transactionType == "CASH") {
      req.flash("success", "Hệ thống đã xác nhận bạn thanh toán bằng tiền mặt");
      res.redirect("/");
    } else {
      const vnpUrl = paymentUrl(req, res);
      res.redirect(vnpUrl);
    }
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).send("Error during checkout");
  }
};

const cancelTrip = async (req, res) => {
  try {
    const id = req.params.id;
    await Booking.updateOne(
      {
        _id: id,
      },
      {
        deleted: true,
        deletedAt: new Date(),
      }
    );
    res.json({
      code: 200,
      message: "Hủy thành công",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Hủy thất bại!",
      error: error,
    });
  }
};

module.exports = {
  vnpReturn,
  checkout,
  cancelTrip,
};
