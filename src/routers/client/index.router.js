const homeRouters = require("./home.router");
const tourRouters = require("./tour.router");
const priceTableRouters = require("./price-table.router");
const searchRouters = require("./search.router");
const cartRouters = require("./cart.router");
const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");
const checkCookieMiddleware = require("../../middlewares/checkCookie.middleware");
module.exports = (app) => {
  app.use(checkCookieMiddleware.checkCookieMiddleware);
  app.use(categoryMiddleware.category);
  app.use(cartMiddleware.cartTourId);
  app.use("/", homeRouters);
  app.use("/tours", tourRouters);
  app.use("/price-table", priceTableRouters);
  app.use("/search", searchRouters);
  app.use("/cart", cartRouters);
};
