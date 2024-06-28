const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const { createUser } = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const response = await createUser(req);
    res.status(201).json({ message: "user created", user: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
};
