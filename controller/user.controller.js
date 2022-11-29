const userModel = require("../model/user")

exports.listUser = async (req,res)=>{
    try{
        const user = await userModel.find()
        return res.status(200).send({status:"ok","statusCode":200,data:user})
    }catch (e) {
        res.status(500).send(e)
    }
}

// class user{
//     listUser = async (req,res)=>{
//         try{
//             const user = await userModel.find()
//             res.status(200).send({message:"listed successfully..!!",data:user})
//         }catch (e) {
//             res.status(500).send(e)
//         }
//     }
// }

