require("dotenv").config();

const express = require("express");
const app = express();

// connect database
const database = require("./src/config/database");
database.connect();

// router
const routerAdmin = require("./src/routers/admin/index.router");
const routerClient = require("./src/routers/client/index.router");

// variable env
const port = process.env.PORT || 3000;
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
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// end flash

// variable prefix
const moment = require("moment");
const systemConfig = require("./src/config/system");
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

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
routerAdmin(app);
routerClient(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
