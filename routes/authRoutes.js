const express = require("express");
const { loginUser, registerPatient } = require("../controllers/authController");
const validateSchema = require("../middlewares/validateSchema");
const router = express.Router();
const loginValidation = require("../validations/auth/loginValidation");
const registerValidation = require("../validations/auth/registerValidation");

router.post("/login", validateSchema(loginValidation),loginUser);
router.post("/register", validateSchema(registerValidation), registerPatient)

module.exports = router;