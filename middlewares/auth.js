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
    return next();
  } catch (ex) {
    console.log(ex);
    return res.json({ error: "Invalid token" });
  }
};

export const isPatient = async(req,res,next) => {
    const {user} = req.body;

    if(user.role_id === 1) {
        return next();
    }

    else {
        return res.status(403).json({error: "Only user of type patient is allowed"})
    }
}

export const isDoctor = async(req,res,next) => {
    const {user} = req.body;

    if(user.role_id === 2) {
        return next();
    }

    else {
        return res.status(403).json({error: "Only user of type doctor is allowed"})
    }
}
