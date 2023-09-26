const { PrismaClient } = require('@prisma/client');
const userLoginSchema = require('../validations/userLoginSchema');
const prisma = new PrismaClient();

async function loginUser(req,res) {
  try {
    userLoginSchema.parse(req.body);
    
  } catch (error) {
    console.log('Validation failed', error);
    return res.json({error: error.issues[0].message});
  }

  res.send("Login route");
  

}

module.exports = {
  loginUser
}