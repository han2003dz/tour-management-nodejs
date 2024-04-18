
const userRouter = require("./users.router");
const authRouter = require("./auth.router");
const tourRouter = require("./tour.router");
const categoryRouter = require("./category.router");
const roleRouter = require("./role.router");
const cartRouter = require("./cart.router");

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
];

routes.map((route) => {
  router.use(route.path, route.route);
});

module.exports = router;