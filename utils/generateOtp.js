const otpGenerator = require('otp-generator');

function generateOtp() {
  const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
  return otp;
}

module.exports = generateOtp;
