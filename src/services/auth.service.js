const bcryptjs = require("bcryptjs");
const User = require("../models/User");

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

module.exports = {
  createUser,
};
