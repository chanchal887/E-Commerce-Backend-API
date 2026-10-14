const jwt = require("jsonwebtoken")

async function authmiddlewear(req,res,next){
    const token = req.cookies.token
    

    if(!token){
        return res.status(401).json({
            message:"unauthorized"
        })
    }

    const tokenVerify = jwt.verify(token,process.env.JWT_SECRET_KEY)

    req.user = tokenVerify
    next()
}

module.exports={authmiddlewear}