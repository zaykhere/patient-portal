function registerDto(user) {
  const {name, email, address} = user;

  let res = {
    name,
    email,
    address
  }

  return res;
}

module.exports = registerDto;