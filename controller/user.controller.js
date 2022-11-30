const userModel = require("../model/user")
const {userAddValidation} = require("../validation/userValidation")


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
