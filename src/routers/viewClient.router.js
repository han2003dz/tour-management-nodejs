const viewClientRouter = require("express").Router();
const { viewClientController } = require("../controllers/index.controller");
const categoryMiddleware = require("../middlewares/client/category.middleware");
const cartMiddleware = require("../middlewares/client/cart.middleware");
const infoWebSite = require("../middlewares/infoWebSite.middleware");

const {
  checkCookieMiddleware,
} = require("../middlewares/checkCookie.middleware");

viewClientRouter.use(categoryMiddleware.category);
viewClientRouter.use(cartMiddleware.cartTourId);
viewClientRouter.use(infoWebSite.settingGeneral);

viewClientRouter.get("/register", viewClientController.register);
viewClientRouter.get("/login", viewClientController.login);
viewClientRouter.get("/forgot-password", viewClientController.forgotPassword);
viewClientRouter.get("/otp", viewClientController.otp);
viewClientRouter.get("/reset-password", viewClientController.resetPassword);

viewClientRouter.get("/", checkCookieMiddleware, viewClientController.home);

viewClientRouter.get(
  "/tours",
  checkCookieMiddleware,
  viewClientController.listTour
);
viewClientRouter.get(
  "/detail/:slugTour",
  checkCookieMiddleware,
  viewClientController.detailTourClient
);

viewClientRouter.get(
  "/price-table",
  checkCookieMiddleware,
  viewClientController.priceTable
);

viewClientRouter.get(
  "/policy",
  checkCookieMiddleware,
  viewClientController.policy
);

viewClientRouter.get("/cart", checkCookieMiddleware, viewClientController.cart);
viewClientRouter.get(
  "/cart/updateQuantityAdult/:tourId/:quantityAdult",
  checkCookieMiddleware,
  viewClientController.updateCart
);
viewClientRouter.get(
  "/cart/updateQuantityChild/:tourId/:quantityChild",
  checkCookieMiddleware,
  viewClientController.updateCart
);

viewClientRouter.get(
  "/search/:type",
  checkCookieMiddleware,
  viewClientController.resultSearch
);

viewClientRouter.get(
  "/tours/:slugCategory",
  checkCookieMiddleware,
  viewClientController.categoryTourClient
);

viewClientRouter.get(
  "/info/:id",
  checkCookieMiddleware,
  viewClientController.infoUserClient
);

viewClientRouter.get(
  "/booking/:tourId",
  checkCookieMiddleware,
  viewClientController.booking
);

viewClientRouter.get(
  "/booking/online-payment",
  checkCookieMiddleware,
  viewClientController.onlinePayment
);

viewClientRouter.get(
  "/user/shopping-history/:userId",
  checkCookieMiddleware,
  viewClientController.history
);

viewClientRouter.get(
  "/contact",
  checkCookieMiddleware,
  viewClientController.contact
);

viewClientRouter.get(
  "/user/look-up-bill/:userId",
  checkCookieMiddleware,
  viewClientController.lookUpBill
);

module.exports = viewClientRouter;
