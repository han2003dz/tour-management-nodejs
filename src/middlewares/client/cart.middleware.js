const Cart = require("../../models/cart.model");

module.exports.cartTourId = async (req, res, next) => {
  try {
    if (!req.cookies.cartTourId) {
      const cart = new Cart();
      await cart.save();
      const expiresTime = 1000 * 60 * 60 * 24 * 30;
      const expirationDate = new Date(Date.now() + expiresTime);
      res.cookie("cartTourId", cart.id, {
        expires: expirationDate,
      });
    } else {
      const cart = await Cart.findOne({
        _id: req.cookies.cartTourId,
      });
      if (cart.tours.length >= 0) {
        cart.quantity = cart.tours.length;
      }
      res.locals.miniCart = cart;
    }
  } catch (error) {
    console.error("Error in cartTourId middleware:", error);
  }
  next();
};
