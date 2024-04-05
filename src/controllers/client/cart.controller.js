const Cart = require("../../models/cart.model");
const Tours = require("../../models/tours.model");
const index = async (req, res) => {
  try {
    const cartTourId = req.cookies.cartTourId;
    const cart = await Cart.findOne({
      _id: cartTourId,
    });
    if (cart.tours.length > 0) {
      for (const item of cart.tours) {
        const tourId = item.tour_id;
        const tour = await Tours.findOne({
          _id: tourId,
        });
        item.tour = tour;
        item.totalPrice =
          item.quantityAdult * tour.priceAdult +
          item.quantityChild * tour.priceChild;
      }
    }
    cart.totalPrice = cart.tours.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );
    res.render("client/pages/cart/index", {
      pageTitle: "Giỏ hàng",
      cart,
    });
  } catch (error) {
    console.log(error);
  }
};

const addPost = async (req, res) => {
  try {
    const quantityChild = Number(req.body.quantityChild);
    const quantityAdult = Number(req.body.quantityAdult);
    const cartTourId = req.cookies.cartTourId;
    const tourId = req.params.tourId;
    const cart = await Cart.findOne({
      _id: cartTourId,
    });
    const existTourInCart = cart.tours.find((item) => item.tour_id == tourId);
    if (existTourInCart) {
      const quantityChildNew = quantityChild + existTourInCart.quantityChild;
      const quantityAdultNew = quantityAdult + existTourInCart.quantityAdult;
      await Cart.updateOne(
        {
          _id: cartTourId,
          "tours.tour_id": tourId,
        },
        {
          $set: {
            "tours.$.quantityAdult": quantityAdultNew,
            "tours.$.quantityChild": quantityChildNew,
          },
        }
      );
    } else {
      const objectCart = {
        tour_id: tourId,
        quantityAdult: quantityAdult,
        quantityChild: quantityChild,
      };

      await Cart.updateOne(
        {
          _id: cartTourId,
        },
        {
          $push: { tours: objectCart },
        }
      );
      req.flash("success", "Thêm tour vào giỏ hàng thành công!");
    }
  } catch (error) {
    req.flash("error", "Thêm tour vào giỏ hàng thất bại!");
    console.log(error);
  }
  res.redirect("back");
};

module.exports = {
  addPost,
  index,
};
