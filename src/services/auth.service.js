const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { ROLES } = require("../utils/enums");

const createUser = async (req) => {
  const { email, password, name } = req.body;
  try {
    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashPassword,
      role: ROLES.USER,
      name,
    });

    return newUser;
  } catch (error) {
    throw new Error("Registration failed");
  }
};

const userLogin = async (req) => {
  const { email, password } = req.body;

  if (!email && !password) {
    throw new Error("Email and password required");
  }
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new Error("Email is not registered yet");
  }

  const isMatch = await bcryptjs.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateToken(user);

  return accessToken;
};

module.exports = {
  createUser,
  userLogin,
};
