const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const generateToken = require('../utils/generateToken');
const registerDto = require('../dtos/auth/registerDto');
const generateOtp = require('../utils/generateOtp');
const sendMail = require('../utils/sendMail');

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

async function registerPatient(req,res) {
  const {name, email, phone, address, password, confirm_password, country_code} = req.body;

  try {
    const userExists = await prisma.users.findFirst({
      where: {
        email: email
      }
    });

    if(userExists) return res.status(400).json({error: "User already exists"});

    if(password !== confirm_password) return res.status(400).json({error: "Passwords don't match"});

    let createdUser = null;
    let createdUserRole = null;

    const otp = generateOtp();
    const currentDate = new Date();

    await prisma.$transaction(async (tx) => {
      createdUser = await tx.users.create({
        data: {
          email: email.trim(),
          name: name.trim(),
          otp: otp,
          otp_sent_at: currentDate,
          address: address ? address.trim() : null,
          password: await bcrypt.hash(password, 10),
          phone_numbers: {
            create: {
              country_code: country_code,
              phone: phone
            }
          },
          role_id: 1,
        }
      });

      createdUserRole = await tx.users_roles.create({
        data: {
          role_id: 1,
          user_id: createdUser.id
        }
      })

    })

    const response = registerDto(createdUser);   

    if(createdUser && createdUserRole) {
      const mailSent = await sendMail(createdUser.email, 'OTP', otp);

      if(mailSent) {
        res.status(200).json({
          success: true,
          user: response
        })
      }

      else {
        res.status(500).json({
          error: 'Failed to send email'
        })
      }
    }

    else {
      res.status(500).json({
        error: 'Something went wrong!'
      })
    }
    

  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

async function verifyOtp(req,res) {
  const {otp, email} = req.body;

  try {
    const user = await prisma.users.findFirst({
      where: {
        email: email
      }
    });

    if(!user) return res.status(400).json({error: "User not found"});

    if(user.is_verified === 1) return res.status(400).json({error: "User already verified"});

    if(user.otp == otp) {
      await prisma.users.update({
        where: {
          id: user.id
        },
        data: {
          is_verified: 1
        }
      })

      return res.status(200).json({
        success: true,
        token: generateToken(user.id)
      })
    }

    else {
      return res.status(400).json({error: "Invalid Otp"});
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({error: error.message});
  }
}

async function resendOtp(req,res) {
  const {email} = req.body;

  try {
    const user = await prisma.users.findFirst({
      where: {
        email: email
      }
    });

    if(!user) return res.status(400).json({error: "User not found"});

    if(user.is_verified === 1) return res.status(400).json({error: "User already verified"});

    const otp = generateOtp();
    const currentDate = new Date();

    

   const updatedUser =  await prisma.users.update({
      where: {
        id: user.id
      },
      data: {
        otp: otp,
        otp_sent_at: currentDate
      }
    });

    if(updatedUser) {
      const mailSent = await sendMail(updatedUser.email, 'OTP', otp);

    if(mailSent) {
      res.status(200).json({
        success: true,
        message: 'OTP has been resent successfully'
      })
    }

    else {
      res.status(500).json({
        error: 'Failed to send email'
      })
    }
    }

    else {
      res.status(500).json({
        error: 'Something went wrong'
      })
    }

  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

async function forgotPasswordRequest(req,res) {
  const {email} = req.body;

  try {
    const user = await prisma.users.findFirst({
      where: {
        email: email
      }
    });

    if(!user) return res.status(400).json({error: "User not found"});

    const otp = generateOtp();
    const currentDate = new Date();

   const updatedUser =  await prisma.users.update({
      where: {
        id: user.id
      },
      data: {
        otp: otp,
        otp_sent_at: currentDate
      }
    });

    if(updatedUser) {
      const mailSent = await sendMail(updatedUser.email, 'Forgot Password Request', otp);

    if(mailSent) {
      res.status(200).json({
        success: true,
        message: 'OTP has been resent successfully'
      })
    }

    else {
      res.status(500).json({
        error: 'Failed to send email'
      })
    }
    }

    else {
      res.status(500).json({
        error: 'Something went wrong'
      })
    }

  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

async function resetPassword(req,res) {
  const {email, otp, password} = req.body;

  try {
    const user = await prisma.users.findFirst({
      where: {
        email: email
      }
    });

    if(!user) return res.status(400).json({error: "User not found"});

    if(otp == user.otp) {
      const updatedUser =  await prisma.users.update({
        where: {
          id: user.id
        },
        data: {
          password
        }
      });
    }

    else {
      return res.status(400).json({error: "Invalid OTP"});
    }

  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

module.exports = {
  loginUser,
  registerPatient,
  verifyOtp,
  resendOtp,
  forgotPasswordRequest
}