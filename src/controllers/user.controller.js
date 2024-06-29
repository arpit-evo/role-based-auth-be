const {
  getUser,
  _delete,
  update,
  getAll,
  changeUserRole,
} = require("../services/user.service");

const getProfile = async (req, res) => {
  try {
    const response = await getUser(req);
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, success: false, data: null });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await update(req);
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, success: false, data: null });
  }
};

const deleteUser = async (req, res) => {
  try {
    await _delete(req);
    res.status(204).json({
      success: true,
      data: null,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, success: false, data: null });
  }
};

const updateUserRole = async (req, res) => {
  try {
    await changeUserRole(req);
    res.status(200).json({
      success: true,
      data: null,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, success: false, data: null });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await getAll();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, success: false, data: null });
  }
};

module.exports = {
  getProfile,
  updateUser,
  deleteUser,
  getAllUser,
  updateUserRole,
};
