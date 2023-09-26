const express = require("express");
const { loginUser } = require("../controllers/authController");
const validateSchema = require("../middlewares/validateSchema");
const userLoginSchema = require("../validations/userLoginSchema");
const router = express.Router();

router.post("/login", validateSchema(userLoginSchema),loginUser);

module.exports = router;