const express = require("express");
const { loginUser, registerPatient, verifyOtp } = require("../controllers/authController");
const validateSchema = require("../middlewares/validateSchema");
const router = express.Router();
const loginValidation = require("../validations/auth/loginValidation");
const registerValidation = require("../validations/auth/registerValidation");
const verifyOtpValidation = require("../validations/auth/verifyOtpValidation");

router.post("/login", validateSchema(loginValidation),loginUser);
router.post("/register", validateSchema(registerValidation), registerPatient);
router.post("/verify-otp", validateSchema(verifyOtpValidation) , verifyOtp);

module.exports = router;