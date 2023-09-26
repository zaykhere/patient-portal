const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function loginUser(req, res) {
  res.send("Login route");


}

module.exports = {
  loginUser
}