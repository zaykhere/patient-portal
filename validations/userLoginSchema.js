const zod = require("zod");

let userLoginSchema = zod.object({
  email: zod.string().trim().email("Please enter a valid email"),
  password: zod.string().min(6, {message: "Password must contain at least 6 characters."}).max(32, {
    message: "Password must not exceed 32 characters."
  })
})

module.exports = userLoginSchema;