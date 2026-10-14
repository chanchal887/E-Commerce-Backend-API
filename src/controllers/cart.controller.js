const cartModel = require("../models/cart.model")


async function cartAdd(req,res){
    try{
    const user= req.user.id
    const {product,quantity}= req.body

    if(!product|| !quantity || quantity===undefined){
        return res.status(400).json({
            message:"invalid data"
        })
    }
    let cart = await cartModel.findOne({user})
    if(!cart){
      cart= await cartModel.create({
         user:user,
         productlist:[
            {
             product,
         quantity   
            }
         ]      
    }) 
    }else{
        cart.productlist.push({
            product,
            quantity
        })
        await cart.save()
    }
    
res.status(201).json({
        message:"cart create successfully",
cart
    })
    }catch(err){
        console.log(err.message)
        res.status(500).json({
            message:"server error"
        })
    }
   
    

}

async function cart(req,res){
    try{
    const userId = req.user.id
    const cart = await cartModel.find({
        user:userId
    })

    if(cart.length===0){
        return res.status(404).json({
            message:"no cart found"
        })
    }
    res.status(200).json({
        message:"user cart",
        cart
    })
    }catch(err){
        console.log(err.message)
        res.status(500).json({
            error:"server error"
        })
    }

}

async function productRemove (req,res){
try
{
    const productId = req.params.id
    const userId = req.user.id

    const cart = await cartModel.findOneAndUpdate(
       { user:userId },
      { $pull : {
        productlist:{
             product:productId
        }}
},
        {new:true}
    )
    if(!cart){
        return res.status(404).json({
            message:"product not found in cart",
            cart
        })
    }
    res.status(200).json({
        message:"user product remove successfully"
    })}
    catch(err){
        console.log(err.message)
        res.status(500).json({
            error:"server error"
        })
    }
}

async function productUpdate(req,res){
    try{
    const userId = req.user.id
    const product = req.params.id
    const {quantity}=req.body
    if ( !quantity || quantity<1 ){
        return res.status(400).json({
            message:"quantity will be a Positive integer"
        })
    }
    const update = await cartModel.findOneAndUpdate({
       "productlist.product":product,
        user:userId
    },
{
   $set: {
    "productlist.$.quantity": quantity
}
},
{new:true}
)

if(!update){
    return res.status(404).json({
        message:"cart not found or cannot update"
    })
}
res.status(200).json({
    message:"cart update successfully",
    update
})}catch(err){
    console.log(err)
    res.status(500).json({
        error:"server error"
    })
}

}

module.exports = {cartAdd,cart,productRemove,productUpdate}