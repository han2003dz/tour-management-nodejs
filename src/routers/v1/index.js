const userRouter = require("./users.router");
const authRouter = require("./auth.router");
const tourRouter = require("./tour.router");
const categoryRouter = require("./category.router");
const roleRouter = require("./role.router");
const cartRouter = require("./cart.router");
const bookingRouter = require("./booking.router");
const settingRouter = require("./setting.router");
const contactRouter = require("./contact.router");
const statisticRouter = require("./statistic.router");
const reviewRouter = require("./review.router");
const trashRouter = require("./trash.router");
const router = require("express").Router();
const routes = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/tours",
    route: tourRouter,
  },
  {
    path: "/categories",
    route: categoryRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/roles",
    route: roleRouter,
  },
  {
    path: "/cart",
    route: cartRouter,
  },
  {
    path: "/booking",
    route: bookingRouter,
  },
  {
    path: "/settings",
    route: settingRouter,
  },
  {
    path: "/contact",
    route: contactRouter,
  },
  {
    path: "/statistic",
    route: statisticRouter,
  },
  {
    path: "/review",
    route: reviewRouter,
  },
  {
    path: "/trash",
    route: trashRouter,
  },
];

routes.map((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
