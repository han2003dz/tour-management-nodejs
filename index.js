require("dotenv").config();

const express = require("express");
const app = express();
// connect database
const database = require("./src/config/database");
require("./src/utils/statusTrip");
database.connect();

// router
const routerAdmin = require("./src/routers/viewAdmin.router");
const routerClient = require("./src/routers/viewClient.router");

// variable env
const port = process.env.PORT || 8080;
const parser = process.env.PARSER;

// library
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const path = require("path");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(methodOverride("_method"));
// flash
app.use(cookieParser(`${parser}`));
app.use(
  session({
    cookie: { maxAge: 6000000 },
  })
);
app.use(flash());
// end flash

// variable prefix
const moment = require("moment");
const systemConfig = require("./src/config/system");
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

const cron = require("node-cron");
process.stdin.resume();

app.set("views", `${__dirname}/src/views`);
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/src/public`));

// tinyMce
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// router
app.use("/admin", routerAdmin);
app.use("/", routerClient);
// API v1
const router = require("./src/routers/v1");
const { errorMiddleware } = require("./src/middlewares/error.middleware");
app.use("/api/v1/", router);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
