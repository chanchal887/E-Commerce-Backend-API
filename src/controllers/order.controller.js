const orderModel = require("../models/order.model")


async function orderCreate(req,res){
    try{
    const userId = req.user.id
    const {username,state,distt,pincode,phonenumber,productid,quantity,totalamount} =req.body
    console.log(username,state,distt,pincode,phonenumber,productid,quantity,totalamount)

    if(!username ||!state ||!distt ||!pincode ||!phonenumber||!quantity ||!productid ||!totalamount){
        return res.status(400).json({
            message:"fill inputs properly"
        })
    }

    const order = await orderModel.create({
        buyer:userId,
        username,
        totalamount,
        phonenumber,
        address:{
            state,
        distt,
        pincode, 
        },

        products:[
            {
             productid,
        quantity   
            }
        ]
        
    })

    res.status(201).json({
  message:"order successfully placed",
  order
    })
    }catch(err){
        console.log(err)
        res.status(500).json({
            error:"server error"
        })
    }
}

async function order(req,res){
    try{
    const userId = req.user.id
    const orders = await orderModel.find(
        {
            buyer:userId
        }
    )
    if(orders.length===0){
return res.status(404).json({
    message:"no order found"
})
    }

    res.status(200).json({
        message:"order list ",orders
    })
}catch(err){
    console.log(err.message)
    res.status(500).json({
        error:"server error"
    })
}
}

async function orderCancle(req,res){
    try{
    const orderId = req.params.id
   console.log(orderId)
    const userId = req.user.id
    console.log(userId)

    const orderCancle = await orderModel.findOneAndUpdate({
        buyer:userId,
        _id:orderId,
        status:"pending"
       
    },{
      status:"cancelled"  
    },{
        returnDocument: "after"
    })
if(!orderCancle){
    return res.status(404).json({
        message:"order not found or cannot be cancalled"
    })
}
 res.status(200).json({
    message:"order cancalled successfully",
    orderCancle
 })
    }catch(err){
        console.log(err.message)
        res.status(500).json({
            error:"server error"
        })
    }

}

async function orderUpdate(req,res){
    try{
    const orderId = req.params.id
    const userId = req.user.id

    const {state,distt,pincode,phonenumber,username}= req.body
const addressUpdate ={}
 if(username){
   addressUpdate.username = username
    }
    if(state){
   addressUpdate["address.state" ]= state
    }
    if(distt){
        addressUpdate["address.distt"] = distt
    }
   if(pincode){
    addressUpdate["address.pincode"]= pincode
   }
   if(phonenumber){
    addressUpdate.phonenumber = phonenumber
   }

   const orderUpdate = await orderModel.findOneAndUpdate({
    _id:orderId,
    buyer:userId,
    status:"pending"
   },

  { $set:addressUpdate},
   

{returnDocument:"after"})
if(!orderUpdate){
    return res.status(400).json({
        message:"user not updated or not found"
    })
}

res.status(200).json({
    message:"order update successfull",
    orderUpdate
})
    }catch(err){
        console.log(err.message)
        res.status(500).json({
            error:"server error"
        })
    }

}






module.exports = {orderCreate,order,orderCancle,orderUpdate}