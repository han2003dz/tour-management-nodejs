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
    const expectedDate = req.body.expectedDate;
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
            "tours.$.expectedDate": expectedDate,
          },
        }
      );
    } else {
      const objectCart = {
        tour_id: tourId,
        quantityAdult,
        quantityChild,
        expectedDate,
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

const deleteItem = async (req, res) => {
  try {
    const cartId = req.cookies.cartTourId;
    const tourId = req.params.tourId;
    await Cart.updateOne(
      {
        _id: cartId,
      },
      {
        $pull: {
          tours: {
            tour_id: tourId,
          },
        },
      }
    );
    req.flash("success", "Xóa tour trong giỏ hàng thành công!");
  } catch (error) {
    req.flash("error", "Xóa tour trong giỏ hàng thất bại!");
  }
  res.redirect("back");
};

const update = async (req, res) => {
  try {
    const cartId = req.cookies.cartTourId;
    const tourId = req.params.tourId;
    const { quantityAdult, quantityChild } = req.params;
    const updateFields = {};
    if (quantityAdult) {
      updateFields["tours.$.quantityAdult"] = quantityAdult;
    }
    if (quantityChild) {
      updateFields["tours.$.quantityChild"] = quantityChild;
    }
    await Cart.updateOne(
      {
        _id: cartId,
        "tours.tour_id": tourId,
      },
      {
        $set: updateFields,
      }
    );
  } catch (error) {
    req.flash("error", "Cập nhật thất bại!");
  }

  res.redirect("back");
};

module.exports = {
  addPost,
  index,
  deleteItem,
  update,
};
