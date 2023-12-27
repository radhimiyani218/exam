const express = require("express");
const connection = require("./backend/config/db");
const cookie = require("cookie-parser");
const router = require("./backend/routes/user.route");
const productrouter= require("./backend/routes/product.route")
const cors=require("cors");
const app = express();
app.use(cors({origin:"*"}))
app.use(express.json());

app.use(cookie());
app.use("/product", productrouter)
app.use("/user", router);

app.listen(8090, () => {
  console.log("Listening on 8090");
  connection();
});
