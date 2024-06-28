const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  try {
    if (!token) {
      throw new Error("Token is not provided");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decodedToken.id).select("-password");

    req.user = user;
    next();
  } catch (error) {
    throw new Error( "Invalid token" );
  }
};

const authorizeRoles = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).send("Unauthorized");
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorizeRoles,
};
