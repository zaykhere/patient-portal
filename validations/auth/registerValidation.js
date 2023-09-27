const {Joi} = require('express-validation');

registerValidation = Joi.object({
    email: Joi.string().min(3).max(40).email().required(),
    password: Joi.string().min(6).max(32).required(),
    confirm_password: Joi.string().min(6).max(32).required(),
    name: Joi.string().min(2).max(60).required(),
    phone: Joi.string().regex(/^\d{10,13}$/).required(),
    country_code: Joi.string().min(3).max(4).required(),
    address: Joi.string().optional().min(5).max(500)
});

module.exports = registerValidation;