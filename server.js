const express = require("express");
const cors = require("cors");
const http = require("http");
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

//Import Routes

const userRoutes = require("./routes/authRoutes");

//Use Routes
app.use("/api/auth", userRoutes);

const server = http.createServer(app);

const PORT = process.env.SERVER_PORT || 5000;

prisma.$connect()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
      console.log("Connected to the database.");
    })
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })

process.on('SIGINT', async () => {
  console.log('Received SIGINT. Closing Prisma connection...');

  await prisma.$disconnect(); // Close the Prisma connection

  console.log('Prisma connection closed. Exiting...');
  process.exit(0);
});