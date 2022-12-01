const userModel = require("../model/user")
const {userAddValidation} = require("../validation/userValidation")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.listUser = async (req, res) => {
    try {
        const user = await userModel.find()
        return res.status(200).send({status: "ok", statusCode: 200, data: user})
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.viewUser = async (req, res) => {
    try {
        const user = await userModel.findOne({_id: req.params.id})
        if (!user) return res.status(400).send({status: 0, statusCode: 400, message: "User not found"})
        return res.status(200).send({status: "ok", statusCode: 200, data: user})
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.create = async (req, res) => {
    try {
        const validationMessage = await userAddValidation(req.body)
        if (validationMessage) return res.status(400).send(validationMessage)
        const user = new userModel(req.body)
        return res.status(200).send({status: "ok", statusCode: 200, data: user})
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.logIn =async (req,res)=>{
    try{
        const existingUser = await userModel.findOne({email:req.body.email})
        if(!existingUser) return res.status(400).send({message:"Email or Password invalid..!!"})
        const validPassword = await bcrypt.compare(req.body.password,existingUser.password)
        if(!validPassword) return res.status(400).send({message:"Email or Password invalid..!!"})
        const tokenData = {
            userId: existingUser._id,
            Name: existingUser.name,
            Email: existingUser.email,
            Phone: existingUser.phone,
            DeviceToken: existingUser.deviceToken,
        }
        const token = jwt.sign(tokenData,"hellobritherthisismeet",{expiresIn:"365d"})
        return res.status(200).send({message:"Logged In successfully..!!",token:token,data:tokenData})
    }catch (e) {
        return res.send(500).send(e)
    }
}