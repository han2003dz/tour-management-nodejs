require("dotenv").config();

const express = require("express");
const app = express();

const path = require("path");
// router
const routerAdmin = require("./src/routers/admin/index.router");

// connect database
const database = require("./src/config/database");
database.connect();

// variable env
const port = process.env.PORT;

// variable prefix
const systemConfig = require("./src/config/system");
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.set("views", `${__dirname}/src/views`);
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/src/public`));

routerAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
