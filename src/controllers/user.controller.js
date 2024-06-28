const {
  getUser,
  _delete,
  update,
  getAll,
} = require("../services/user.service");

const me = async (req, res) => {
  try {
    const response = await getUser(req);
    res.status(200).json({
      success: true,
      data: response,
      message: "user fetched",
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
      message: "user updated",
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
      message: "user deleted",
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
      message: "Fetched ALL users",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, success: false, data: null });
  }
};

module.exports = {
  me,
  updateUser,
  deleteUser,
  getAllUser
};
