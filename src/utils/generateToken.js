const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );

  return accessToken;
};

module.exports = generateToken;
