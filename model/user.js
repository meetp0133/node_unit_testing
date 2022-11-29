const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    status: {
        type: Number,
        default: 1,
        enum: [1, 2, 3]
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phone:{
        type:Number
    },
    deviceToken:{
        type: String
    }
}, {collection: "userToken", timestamps: true})

const userModel = new mongoose.model("userToken", userSchema)
module.exports = userModel