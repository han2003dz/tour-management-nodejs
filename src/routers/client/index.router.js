const homeRouters = require("./home.router");
module.exports = (app) => {
  app.use("/", homeRouters);
};
