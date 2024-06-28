const { createUser, userLogin } = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const response = await createUser(req);
    res
      .status(201)
      .json({ message: "user created", success: true, data: response });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, success: false, data: null });
  }
};

const login = async (req, res) => {
  try {
    const token = await userLogin(req);
    res.status(200).json({ message: "user login", success: true, data: token });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, success: false, data: null });
  }
};

module.exports = {
  register,
  login,
};
