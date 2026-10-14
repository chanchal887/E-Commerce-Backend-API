const mongoose = require("mongoose");

const productSchmea = mongoose.Schema({
    productName:{
        type:String,
        required:true,
        trim:true,
        minlength:2
    },
    description:{
        type:String,
        required:true,
        trim:true,

    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        requried:true,
        min:0
    },
    rating:{
        type:Number,
        required:true,
        min:0,
        max:5
    },
producer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
}
})

const productModel = mongoose.model("products",productSchmea)

module.exports = productModel


