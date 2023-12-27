const {Router} = require('express');
const {create, find, payment } = require('../controller/product.controller');
const productrouter = Router();

productrouter.post("/create", create);
productrouter.get("/find", find);
productrouter.post("/payment", payment);

module.exports =productrouter