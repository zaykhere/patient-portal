const zod = require("zod");

let userLoginSchema = zod.object({
  email: zod.string().trim().email("Please enter a valid email"),
  password: zod.string().min(6).max(32)
})

module.exports = userLoginSchema;