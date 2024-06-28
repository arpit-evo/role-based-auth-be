const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const createUser = async (req) => {
  const { email, password, role } = req.body;

  try {
    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ email, password: hashPassword, role });
    await newUser.save();

    return newUser;
  } catch (error) {
    throw new Error(error, "registration failed");
  }
};

const userLogin = async (req) => {
  const { email, password } = req.body;

  if (!email && !password) {
    throw new Error("email and password required");
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error({ message: "user not found with this email" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      throw new Error({ message: "invalid credential" });
    }

    const accessToken = generateToken(user);

    return accessToken;
  } catch (error) {
    throw new Error({ error, message: "registration failed" });
  }
};

module.exports = {
  createUser,
  userLogin,
};
