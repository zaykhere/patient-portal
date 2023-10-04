const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ error: "You are not allowed to visit this route" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.users.findFirst({
        where: {
            id: decoded.id
        }
    });
    if (!user) return res.json({ error: "No user found" });
    delete user.password;
    req.user = user;
    next();
  } catch (ex) {
    console.log(ex);
    return res.json({ error: "Invalid token" });
  }
};
