const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({

    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    products:[
 {
    productid:{
       type: mongoose.Schema.Types.ObjectId,
    ref:"products",
    required:true
},
quantity:{
    type:Number,
    min:1,
    required:true
}
 }
    ],
    totalamount:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true,
        trim:true,
        minlength:2,

    },
    phonenumber:{
        type:String,
        required:true,
       trim:true

    },
    address:{
        state :{
        type:String,
        required:true,
        trim:true
    },
    distt:{
        type:String,
        required:true,
    }  ,
    pincode:{
        type:String,
        required:true,
        trim:true
    }
    },
    status:{
        type:String,
        enum:[
            "pending",
            "shipped",
            "confirmed",
            "cancalled",
             "delivered"
        ],
        default:"pending"
    }
  
})

const orderModel = mongoose.model("order",orderSchema)

module.exports = orderModel