const {Joi} = require('express-validation');

verifyOtpValidation = Joi.object({
    email: Joi.string().min(3).max(40).email().required(),
    password: Joi.string().min(6).max(32).required(),
    confirm_password: Joi.string().min(6).max(32).required()
});

module.exports = verifyOtpValidation;