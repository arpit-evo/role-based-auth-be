const { getUser } = require("../services/user.service");

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

module.exports = {
  me,
};
