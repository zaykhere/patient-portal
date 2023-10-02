const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ,
  port: process.env.SMTP_PORT,
  // secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.SMTP_LOGIN,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function sendMail(to, subject, text) {

    console.log(process.env.SMTP_HOST);
    try {
        const info = await transporter.sendMail({
            from: 'zainjhere@gmail.com', // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text?.toString(), // plain text body
            html: `<div>${text}</div>`
          });  

          return true;
    } catch (error) {
        console.log(error);
        return false;
    }

    
}

module.exports = sendMail;