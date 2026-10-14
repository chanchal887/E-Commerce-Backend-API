const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:2,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    phonenumber:{
 type:String,
 required:true,
 unique:true,
 max:10
    },
    
    password:{
   type:String,
   required:true,
   min:7
    },

    role:{
        type:String,
        enum:["buyer","seller"],
        default:"buyer"
    }
})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel