const viewAdminRouter = require("express").Router();
const { viewAdminController } = require("../controllers/index.controller");
viewAdminRouter.get("/", viewAdminController.dashboard);

viewAdminRouter.get("/tours", viewAdminController.tours);
viewAdminRouter.get("/tours/edit/:id", viewAdminController.pageEditTour);
viewAdminRouter.get("/tours/create", viewAdminController.pageCreateTour);
viewAdminRouter.get("/tours/detail/:id", viewAdminController.pageDetailTour);

viewAdminRouter.get("/categories", viewAdminController.categories);
viewAdminRouter.get(
  "/categories/edit/:id",
  viewAdminController.pageEditCategory
);
viewAdminRouter.get(
  "/categories/create",
  viewAdminController.pageCreateCategory
);
viewAdminRouter.get(
  "/categories/detail/:id",
  viewAdminController.pageDetailCategory
);

viewAdminRouter.get("/users", viewAdminController.users);
// viewAdminRouter.get("/users/edit/:id", viewAdminController.pageEditAccount);
viewAdminRouter.get("/users/create", viewAdminController.pageCreateAccount);
// viewAdminRouter.get("/users/detail/:id", viewAdminController.pageDetailAccount);

viewAdminRouter.get("/roles", viewAdminController.roles);
viewAdminRouter.get("/roles/edit/:id", viewAdminController.pageEditRole);
viewAdminRouter.get("/roles/create", viewAdminController.pageCreateRole);
viewAdminRouter.get("/roles/detail/:id", viewAdminController.pageDetailRole);
viewAdminRouter.get("/roles/permissions", viewAdminController.permissions);

viewAdminRouter.get("/login", viewAdminController.login);

module.exports = viewAdminRouter;
