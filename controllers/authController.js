const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const generateToken = require('../utils/generateToken');

async function loginUser(req, res) {
  const {email, password} = req.body;

  try {
    const user = await prisma.users.findFirst({
      where: {
        email: email
      }
    });

    if(!user) return res.status(400).json({error: "Invalid Credentials"});

    const passwordMatched = await bcrypt.compare(password, user.password);

    if(!passwordMatched) {
      return res.status(400).json({error: "Invalid Credentials"});
    }

    res.status(200).json({
      user,
      token: generateToken(user.id)
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({error: error.message});
  }
}

async function registerUser(req,res) {
  const {name, email, phone, address, password, confirm_password} = req.body;
}

module.exports = {
  loginUser
}