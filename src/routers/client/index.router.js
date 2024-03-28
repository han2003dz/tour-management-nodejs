const homeRouters = require("./home.router");
const tourRouters = require("./tour.router");
module.exports = (app) => {
  app.use("/", homeRouters);
  app.use("/tours", tourRouters);
};
