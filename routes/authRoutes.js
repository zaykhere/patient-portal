const express = require("express");
const { loginUser, registerPatient, verifyOtp, resendOtp, forgotPasswordRequest, verifyForgotOtp, resetPassword } = require("../controllers/authController");
const validateSchema = require("../middlewares/validateSchema");
const router = express.Router();
const loginValidation = require("../validations/auth/loginValidation");
const registerValidation = require("../validations/auth/registerValidation");
const verifyOtpValidation = require("../validations/auth/verifyOtpValidation");
const resendOtpValidation = require("../validations/auth/resendOtpValidation");
const resetPasswordValidation = require("../validations/auth/resetPasswordValidation");

router.post("/login", validateSchema(loginValidation),loginUser);
router.post("/register", validateSchema(registerValidation), registerPatient);
router.post("/verify-otp", validateSchema(verifyOtpValidation) , verifyOtp);
router.post("/resend-otp", validateSchema(resendOtpValidation), resendOtp)
router.post("/forgot-password", forgotPasswordRequest);
router.post("/verify-forgot-otp", validateSchema(verifyOtpValidation), verifyForgotOtp);
router.post("/verify-forgot-otp", validateSchema(resetPasswordValidation), resetPassword);

module.exports = router;