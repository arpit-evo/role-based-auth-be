const User = require("../models/User");

const getUser = async (req) => {
  delete req.user.createdAt;
  delete req.user.updatedAt;
  delete req.user.password;
  delete req.user.isDeleted;

  return req.user;
};

const _delete = async (req) => {
  const { userId } = req.params;

  try {
    return await User.findByIdAndUpdate(userId, { isDeleted: true });
  } catch (error) {
    throw new Error("user delete fail");
  }
};

const update = async (req) => {
  const userId = req.user._id;
  const { name } = req.body;

  try {
    let user = await User.countDocuments({ _id: userId });

    if (!user) {
      throw new Error("user not found");
    }

    user = await User.findByIdAndUpdate(userId, { name }).select("name email");

    user.name = name;
    return user;
  } catch (error) {
    throw new Error("user update fail");
  }
};

const getAll = async () => {
  try {
    const users = await User.find().select("-password -createdAt -updatedAt");
    return users;
  } catch (error) {
    throw new Error("get all user fail");
  }
};

const changeUserRole = async (req) => {
  const { userId } = req.params;
  const { role } = req.body;

  try {
    let user = await User.countDocuments({ _id: userId });

    if (!user) {
      throw new Error("user not found");
    }

    user = await User.findByIdAndUpdate(userId, { role: parseInt(role) }).select("name email");

    user.role = role;
    return user;
  } catch (error) {
    throw new Error("user role update fail");
  }
};

module.exports = {
  getUser,
  _delete,
  update,
  getAll,
  changeUserRole,
};
