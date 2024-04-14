const viewClientRouter = require("express").Router();
const { viewClientController } = require("../controllers/index.controller");
const categoryMiddleware = require("../middlewares/client/category.middleware");
const cartMiddleware = require("../middlewares/client/cart.middleware");

viewClientRouter.use(categoryMiddleware.category);
viewClientRouter.use(cartMiddleware.cartTourId);

viewClientRouter.get("/register", viewClientController.register);
viewClientRouter.get("/login", viewClientController.login);

viewClientRouter.get("/", viewClientController.home);

viewClientRouter.get("/tours", viewClientController.listTour);
viewClientRouter.get(
  "/detail/:slugTour",
  viewClientController.detailTourClient
);
viewClientRouter.get("/:slugCategory", viewClientController.categoryTourClient);

viewClientRouter.get("/price-table", viewClientController.priceTable);

viewClientRouter.get("/cart", viewClientController.cart);
viewClientRouter.get(
  "/cart/updateQuantityAdult/:tourId/:quantityAdult",
  viewClientController.updateCart
);
viewClientRouter.get(
  "/cart/updateQuantityChild/:tourId/:quantityClild",
  viewClientController.updateCart
);

viewClientRouter.get("/search/:type", viewClientController.resultSearch);
module.exports = viewClientRouter;
