const homeRouters = require("./home.router");
const tourRouters = require("./tour.router");
const priceTableRouters = require("./price-table.router");
const searchRouters = require("./search.router");
const categoryMiddleware = require("../../middlewares/client/category.middleware");
module.exports = (app) => {
  app.use(categoryMiddleware.category);
  app.use("/", homeRouters);
  app.use("/tours", tourRouters);
  app.use("/price-table", priceTableRouters);
  app.use("/search", searchRouters);
};
