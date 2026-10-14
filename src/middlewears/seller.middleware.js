const jwt = require("jsonwebtoken")

async function sellerMiddleware(req,res,next){
    const role= req.user.role
    if(role !=="seller"){
        return res.status(403).json({
            message:"only seller can create the product"
        })
    }
 
next()
}

module.exports = {sellerMiddleware}