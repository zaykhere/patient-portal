const otpGenerator = require('otp-generator');

function generateOtp() {
  let otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
  otp = parseInt(otp);

  return otp;
}

module.exports = generateOtp;
