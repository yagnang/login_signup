const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:{
        type:String
    },
    phone:{
        type:Number
    },
    email:{
        type:String
    },
    role:{
        type:String
    },
    password:{
        type:String
    }
})

const User = new mongoose.model("user",UserSchema)

module.exports = User