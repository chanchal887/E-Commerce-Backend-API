const express = require("express");
const router = express.Router()
const authMiddleware = require("../middlewears/auth.middleware")
const orderController = require("../controllers/order.controller")

router.post("/create",authMiddleware.authmiddlewear,orderController.orderCreate)
router.get("/",authMiddleware.authmiddlewear,orderController.order)
router.patch("/cancle/:id",authMiddleware.authmiddlewear,orderController.orderCancle)
router.patch("/update/:id",authMiddleware.authmiddlewear,orderController.orderUpdate)


module.exports =router