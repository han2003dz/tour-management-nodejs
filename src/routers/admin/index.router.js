const systemConfig = require("../../config/system");
const dashboardRouters = require("../admin/dashboard.router");
const tourRouters = require("../admin/tour.router");
const categoryRouters = require("../admin/category.router");
const roleRouters = require("../admin/role.router");
module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(PATH_ADMIN + "/", dashboardRouters);
  app.use(PATH_ADMIN + "/tours", tourRouters);
  app.use(PATH_ADMIN + "/categories", categoryRouters);
  app.use(PATH_ADMIN + "/roles", roleRouters);
};
