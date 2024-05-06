const Cart = require("../models/cart.model");

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
    if (cart) {
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
          bookingDate: new Date(),
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
    } else {
      req.flash("error", "Bạn cần đăng nhập trước khi thêm tour vào giỏ hàng!");
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

module.exports = {
  addPost,
  deleteItem,
};
