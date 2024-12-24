const viewAdminRouter = require("express").Router();
const { viewAdminController } = require("../controllers/index.controller");
const authMiddleware = require("../middlewares/auth.middleware");
viewAdminRouter.get(
  "/",
  authMiddleware.authMiddleware,
  viewAdminController.dashboard
);

viewAdminRouter.get(
  "/trash",
  authMiddleware.authMiddleware,
  viewAdminController.getTrash
);

viewAdminRouter.get(
  "/tours",
  authMiddleware.authMiddleware,
  viewAdminController.tours
);
viewAdminRouter.get(
  "/tours/edit/:id",
  authMiddleware.authMiddleware,
  viewAdminController.pageEditTour
);
viewAdminRouter.get(
  "/tours/create",
  authMiddleware.authMiddleware,
  viewAdminController.pageCreateTour
);
viewAdminRouter.get(
  "/tours/detail/:id",
  authMiddleware.authMiddleware,
  viewAdminController.pageDetailTour
);

viewAdminRouter.get(
  "/categories",
  authMiddleware.authMiddleware,
  viewAdminController.categories
);
viewAdminRouter.get(
  "/categories/edit/:id",
  authMiddleware.authMiddleware,
  viewAdminController.pageEditCategory
);
viewAdminRouter.get(
  "/categories/create",
  authMiddleware.authMiddleware,
  viewAdminController.pageCreateCategory
);
viewAdminRouter.get(
  "/categories/detail/:id",
  authMiddleware.authMiddleware,
  viewAdminController.pageDetailCategory
);

viewAdminRouter.get(
  "/users",
  authMiddleware.authMiddleware,
  viewAdminController.users
);
// viewAdminRouter.get("/users/edit/:id", viewAdminController.pageEditAccount);
viewAdminRouter.get(
  "/users/create",
  authMiddleware.authMiddleware,
  viewAdminController.pageCreateAccount
);
// viewAdminRouter.get("/users/detail/:id", viewAdminController.pageDetailAccount);

viewAdminRouter.get(
  "/roles",
  authMiddleware.authMiddleware,
  viewAdminController.roles
);
viewAdminRouter.get(
  "/roles/edit/:id",
  authMiddleware.authMiddleware,
  viewAdminController.pageEditRole
);
viewAdminRouter.get(
  "/roles/create",
  authMiddleware.authMiddleware,
  viewAdminController.pageCreateRole
);
viewAdminRouter.get(
  "/roles/detail/:id",
  authMiddleware.authMiddleware,
  viewAdminController.pageDetailRole
);
viewAdminRouter.get(
  "/roles/permissions",
  authMiddleware.authMiddleware,
  viewAdminController.permissions
);

viewAdminRouter.get(
  "/booking",
  authMiddleware.authMiddleware,
  viewAdminController.getOrder
);

viewAdminRouter.get("/login", viewAdminController.login);

viewAdminRouter.get(
  "/settings",
  authMiddleware.authMiddleware,
  viewAdminController.general
);

viewAdminRouter.get(
  "/statistic",
  authMiddleware.authMiddleware,
  viewAdminController.statistic
);

module.exports = viewAdminRouter;
