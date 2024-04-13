const Cart = require("../../models/cart.model");

module.exports.cartTourId = async (req, res, next) => {
  try {
    // if (!req.cookies.cartTourId) {
    //   const cart = new Cart();
    //   await cart.save();
    //   const expiresCookie = 365 * 24 * 60 * 60 * 1000;
    //   res.cookie("cartTourId", cart.id, {
    //     expires: new Date(Date.now() + expiresCookie),
    //   });
    // } else {
    const cart = await Cart.findOne({
      _id: req.cookies.cartTourId,
    });
    if (cart && cart.tours && cart.tours.length > 0) {
      cart.quantity = cart.tours.length;
    }
    res.locals.miniCart = cart;
    // }
    next();
  } catch (error) {
    console.error("Error in cartTourId middleware:", error);
  }
};
