const mongoose = require("mongoose")

  async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGOOSE_URI_KEY)
        console.log("connectDB")
    }catch(err){
        console.log(err)
    }
}

module.exports= connectDB