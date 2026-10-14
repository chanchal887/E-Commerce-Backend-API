const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

/**
 *  -  Register-Route
 *  - POST /api/user/register
 */

async function register(req,res){
    try{

    const {username,email,password,phonenumber,role} = req.body
    if(!username || !email || !password||!phonenumber || phonenumber.length!==10 ){
        return res.status(400).json({
            message:"plese fill detail properly"
        }) }

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
           { email},
            {phonenumber}
        ]
    })
 if(isUserAlreadyExists){
    return res.status(400).json({
        message:"user already exists"
    })
 }

 const hashPassword = await bcrypt.hash(password,10)

 const user = await userModel.create({
    username,
    email,
    phonenumber,
    password:hashPassword,
    role
 })

 const token = jwt.sign({
    id:user._id,
    role:user.role
 },process.env.JWT_SECRET_KEY)

 res.cookie("token",token)

 res.status(201).json({
    message:"user register successfully",
    user:{
        username:user.username,
        email:user.email,
        id:user._id,
        phonenumber:user.phonenumber,
        role:user.role
    }
   
 })}catch(err){
    console.log(err.message)
    res.status(500).json({
        error:"server error"
    })
 }

}

/**
 *  -  Login-Route
 *  - POST /api/user/login
 */
async function login(req,res){
    const {email,phonenumber,password}=req.body

   if (!password) {
    return res.status(400).json({
        message: "Password is required"
    })}

if (!email && !phonenumber) {
    return res.status(400).json({
        message: "Email or phone number is required"
    })
}

if (phonenumber && phonenumber.length !== 10) {
    return res.status(400).json({
        message: "Phone number must have 10 digits"
    })
}

    const user=await userModel.findOne({
        $or:[
         { phonenumber},
         { email}
        ]
    })

    if(!user){
     return res.status(404).json({
        message:"please check your email & password"
     })
    }
 const isPasswordCorrect= await bcrypt.compare(password,user.password)
    if(!isPasswordCorrect){
        return res.status(400).json({
            message:"please check your email & password"
        })
    }

    const token = jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECRET_KEY)
    res.cookie("token",token)

    res.status(200).json({
        message:"user login successfully",
        user:{
            username:user.username,
            email:user.email,
            phonenumber:user.phonenumber,
            id:user._id,
            role:user.role
        }
        
    })
}

/**
 *  -  logout-Route
 *  - POST /api/user/logout
 */

async function logout(req,res){
    const token = req.cookies.token

if(!token){
    return res.status(401).json({
    message:"unauthorized "
    })   
}
  res.clearCookie("token")
  res.status(200).json({
    message:"user logout successfully"
  })

}

module.exports = {register,login,logout}



