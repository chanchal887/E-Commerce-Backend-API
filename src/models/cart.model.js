const mongoose = require("mongoose")
const  cartSchmea =  mongoose.Schema({
 user :{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
 },
 productlist:[
  { 
   product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"products",
    required:true
 }, 
 quantity:{
    type:Number,
    required:true,
    min:1
 }
 }]
 

})

const cartModel = mongoose.model("cart",cartSchmea)

module.exports = cartModel