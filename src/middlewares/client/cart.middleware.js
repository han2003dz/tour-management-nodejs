const Cart = require("../../models/cart.model");

module.exports.cartTourId = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      _id: req.cookies.cartTourId,
    });
    if (cart && cart.tours && cart.tours.length > 0) {
      cart.quantity = cart.tours.length;
    }
    res.locals.miniCart = cart;

    next();
  } catch (error) {
    console.error("Error in cartTourId middleware:", error);
  }
};
