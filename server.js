require("dotenv").config()

const app = require("./src/app")
const Port = process.env.PORT || 3000
const connectDB = require("./src/db/db")
connectDB()

app.listen(Port,()=>{
    console.log("server is running on port 3000")
})