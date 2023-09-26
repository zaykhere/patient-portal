const zod = require("zod");

let userRegistrationSchema = zod.object({
  email: zod.string().trim().email("Please enter a valid email"),
  password: zod.string().min(6, {message: "Password must contain at least 6 characters."}).max(32, {
    message: "Password must not exceed 32 characters."
  }),
  name: zod.string().trim().nonempty().min(2).max(60),
  confirm_password: zod.string().min(6, {message: "Password must contain at least 6 characters."}).max(32, {
    message: "Password must not exceed 32 characters."
  }),
  address: zod.string().trim(),
  phone: zod.string().trim().min(12)
})

module.exports = userRegistrationSchema;