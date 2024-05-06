const Cart = require("../models/cart.model");
const Tours = require("../models/tours.model");
const Booking = require("../models/booking.model");
const { paymentUrl } = require("../helpers/paymentUrl");
const { sortObject } = require("../helpers/sortVnp");

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
      res.redirect("/");
      req.flash("success", "Thanh toán thành công");
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
    const transactionType = req.body.bankCode;
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
          bookingDate: tour.bookingDate,
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
      transactionType,
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
    if (transactionType == "CASH") {
      req.flash("success", "Thanh toán thành công");
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

module.exports = {
  vnpReturn,
  checkout,
};
