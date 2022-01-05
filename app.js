const express = require("express");
const cors = require("cors");
let path = require("path");

const app = express();
let port = process.env.PORT || 3000;

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");

// MIDDLEWARE
app.use(cors());
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));

//ROUTER
app.use(indexRouter);
app.use(apiRouter);

// SERVER LISTEN
app.listen(port, () => {
  console.log("Server Listening...");
});
