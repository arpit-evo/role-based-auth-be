const bcryptjs = require("bcryptjs");
const User = require("../models/User");

const getUser = async (req) => {
  return req.user;
};

const _delete = async (req) => {
  const { id } = req.params;

  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("user delete fail");
  }
};

const update = async (req) => {
  let { id } = req.params;

  if (!id) {
    id = req.user._id;
  }
  const { role, password, email, reported } = req.body;

  try {
    let user = await User.findById(id);

    if (!user) {
      throw new Error("user not found");
    }
    let hashPassword;
    if (password) {
      hashPassword = await bcryptjs.hash(password, 10);
    }

    const updatedUser = {
      email: email || user.email,
      password: hashPassword || user.password,
      role: role || user.role,
      reported: reported || user.reported,
    };

    user = await User.findByIdAndUpdate(id, updatedUser, { new: true });

    return user;
  } catch (error) {
    throw new Error("user update fail");
  }
};

const getAll = async () => {
  try {
    const users = await User.find().select("-password");
    return users;
  } catch (error) {
    throw new Error("get all user fail");
  }
};

module.exports = {
  getUser,
  _delete,
  update,
  getAll,
};
