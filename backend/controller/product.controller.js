const product = require("../model/product.schema");
const Razorpay = require('razorpay');

const create =async(req,res)=>{
    try {
        let data = await product.create(req.body);
        res.send(data);
    } catch (error) {
        return res.send({Error : error.message});
    }
}
const find = async(req, res)=>{
    try {
        let data = await product.find();
        res.send(data)
    } catch (error) {
        return res.send({Error : error.message});
    }
}
const razorpay = new Razorpay({
    key_id: "rzp_test_K5oH0ht3uj6cTB",
    key_secret: "cdTVpD4jbzmOmTFv6vkoSomE"
})
const payment =async(req,res)=>{
    let option = {
        amount : req.body.amount*100,
    }
    razorpay.orders.create(option,(err, order)=>{
        if(err){
            return res.send({Error: err.message})
        }
        else{
            res.send(order)
        }
    })
}
module.exports ={create,find, payment}