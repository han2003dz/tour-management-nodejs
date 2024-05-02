const moment = require("moment");
const crypto = require("crypto");
const { sortObject } = require("../helpers/sortVnp");
const Cart = require("../models/cart.model");
const Tours = require("../models/tours.model");
const Booking = require("../models/booking.model");
const createPaymentUrl = async (req, res) => {
  try {
    if (process.env.TZ) {
      process.env.TZ = process.env.TZ;
    } else {
      process.env.TZ = "Asia/Ho_Chi_Minh";
    }

    let date = new Date();
    let createDate = moment(date).format("YYYYMMDDHHmmss");

    let ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
    let locale = "vn";
    let tmnCode = process.env.vnp_TmnCode;
    let secretKey = process.env.vnp_HashSecret;
    let vnpUrl = process.env.vnp_Url;
    let returnUrl = process.env.vnp_ReturnUrl;
    let orderId = moment(date).format("DDHHmmss");
    let amount = req.body.amount;
    let bankCode = req.body.bankCode;
    let currCode = "VND";
    let vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
    vnp_Params["vnp_OrderType"] = "other";
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    if (bankCode !== null && bankCode !== "") {
      vnp_Params["vnp_BankCode"] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require("qs");
    let signData = querystring.stringify(vnp_Params, { encode: false });

    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

    const userInfo = {
      username: req.body.username,
      phone: req.body.phone,
    };
    const cartTourId = req.cookies.cartTourId;
    const cart = await Cart.findOne({ _id: cartTourId });
    const tourInfo = {
      totalPrice: amount,
    };
    console.log(tourInfo);

    res.redirect(vnpUrl);
  } catch (error) {
    console.log("error create payment url: ", error);
    res.redirect("back");
  }
};

const vnpReturn = async (req, res) => {
  try {
    console.log("OK");
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
      res.render("client/pages/booking/success", {
        code: vnp_Params["vnp_ResponseCode"],
      });
    } else {
      res.render("client/pages/booking/success", { code: "97" });
    }
  } catch (error) {
    console.log("error vnpReturn: ", error);
  }
};

const checkout = async (req, res) => {
  try {
    const cartTourId = req.cookies.cartTourId;
    const tourId = req.params.tourId;
    const userInfo = {
      username: req.body.username,
      phone: req.body.phone,
      note: req.body.note,
    };
    const cart = await Cart.findOne({
      _id: cartTourId,
    });
    let tourInfo = {};
    for (const tour of cart.tours) {
      if (tour.tour_id === tourId) {
        const objectTour = {
          tour_id: tour.tour_id,
          price: 0,
          discountPercentage: 0,
          quantityAdult: tour.quantityAdult,
          quantityChild: tour.quantityChild,
          expectedDate: tour.expectedDate,
        };
        const dataTour = await Tours.findOne({
          _id: tourId,
        });
        objectTour.discountPercentage = dataTour.discountPercentage;
        tourInfo = objectTour;
      }
    }
    const orderInfo = {
      cart_id: cartTourId,
      userInfo,
      tourInfo,
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
        $inc: { stock: -1 },
      },
      { new: true }
    );
    req.flash("success", "Thanh toán thành công");
    res.redirect("/");
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).send("Error during checkout");
  }
};
module.exports = {
  createPaymentUrl,
  vnpReturn,
  checkout,
};
