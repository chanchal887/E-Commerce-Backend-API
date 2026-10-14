const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewears/auth.middleware")
const sellerMiddleware = require("../middlewears/seller.middleware")
const productController = require("../controllers/product.controller")

router.post("/create",authMiddleware.authmiddlewear,sellerMiddleware.sellerMiddleware,productController.productCreate)
router.get("/",authMiddleware.authmiddlewear,productController.product)
router.delete("/delete/:id",authMiddleware.authmiddlewear,sellerMiddleware.sellerMiddleware,productController.productDelete)
router.patch("/update/:id",authMiddleware.authmiddlewear,sellerMiddleware.sellerMiddleware,productController.productUpdate)

module.exports = router