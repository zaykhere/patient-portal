const {Joi} = require('express-validation');

resendOtpValidation = Joi.object({
    email: Joi.string().min(3).max(40).email().required()
});

module.exports = resendOtpValidation;