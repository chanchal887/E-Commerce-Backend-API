const express = require("express")
const router =express.Router()
const authMiddlewear = require("../middlewears/auth.middleware")
const authController = require("../controllers/auth.controller")

router.post("/register",authController.register)
router.post("/login",authController.login)
router.post("/logout",authMiddlewear.authmiddlewear,authController.logout)

module.exports = router