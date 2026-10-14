const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewears/auth.middleware")
const cartController = require("../controllers/cart.controller")


router.post("/add",authMiddleware.authmiddlewear,cartController.cartAdd)
router.get("/",authMiddleware.authmiddlewear,cartController.cart)
router.patch("/remove/:id",authMiddleware.authmiddlewear,cartController.productRemove)
router.patch("/update/:id",authMiddleware.authmiddlewear,cartController.productUpdate)

module.exports = router