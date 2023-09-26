const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function main() {
  await prisma.roles.deleteMany({});
  await prisma.users.deleteMany({});
  await prisma.users_roles.deleteMany({});

  await prisma.roles.createMany({
    data: [
      {id: 1, role_name: 'patient'},
      {id: 2, role_name: 'doctor'},
    ]
  });

  await prisma.users.create({
    data: {
      id: 1,
      name: 'Test User',
      email: 'test@gmail.com',
      password: bcrypt.hashSync('123456', 10),
      role_id: 1
    }
  });

  await prisma.users_roles.create({
    data: {
      user_id: 1,
      role_id: 1
    }
  });

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
