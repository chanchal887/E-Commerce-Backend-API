const express = require("express");
const app = express()
const cookieparser = require("cookie-parser")
const authRouter = require("./routes/auth.route")
const productRouter = require("./routes/product.route")
const cartRouteer = require("./routes/cart.route")
const orderRouter = require("./routes/order.route")

app.use(express.json())
app.use(cookieparser())
app.use("/api/user",authRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouteer)
app.use("/api/user/order",orderRouter)

module.exports= app