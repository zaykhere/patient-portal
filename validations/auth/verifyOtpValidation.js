const {Joi} = require('express-validation');

verifyOtpValidation = Joi.object({
    otp: Joi.string().regex(/^\d{4}$/).required(),
    email: Joi.string().min(3).max(40).email().required()
});

module.exports = verifyOtpValidation;