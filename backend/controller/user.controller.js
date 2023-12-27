const user = require("../model/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const signup=async(req,res)=>{
    try {
        let {name,email, password}= req.body;
        let data = await user.findOne({ email: email});
        if(data){
            return res.send({msg:'already exits'})
        }
        else{
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    return res.send({Error: err.message})
                }
                else{
                    let obj={name:name, email:email, password:hash}
                    let data = await user.create(obj);
                    let token = jwt.sign({id:data.id}, "secret");
                    res.json({token:token, info:data});
                }
            })
        }
    } catch (error) {
        return res.status({Message:error.message});
    }
}
const login = async(req,res)=>{
    console.log(req.body);
    try {
        let {email, password}= req.body;
        let data = await user.findOne({ email: email});
        if(data){
            bcrypt.compare(password,data.password,async(err, result)=>{
                if(err){
                    return res.send({Error: err.message})
                }
                else if(result){
                    
                    let token = jwt.sign({id:data.id}, "secret");
                    res.cookie("token",token).send({msg:"Login Successfully"})
                }
                else{
                    return res.send({Message:'wrong password'})
                }
            })
        }
        else{
            return res.send({Message:'user not found'})
        }
    } catch (error) {
         res.send(error.message);
    }
}


module.exports = { login, signup };