const jwt = require('jsonwebtoken');

module.exports.setToken = (client) => {
  client.password = undefined;

  const token = jwt.sign(
    {
      client,
    },
    process.env.SECRET,
    {
      expiresIn: process.env.JWT_TOKEN_EXPIRARION,
    }
  );

  return {
    status: 200,
    client,
    token,
  };
};
