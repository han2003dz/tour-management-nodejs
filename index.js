require("dotenv").config();

const express = require("express");
const app = express();

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

routerAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
