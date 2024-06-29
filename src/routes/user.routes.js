const express = require("express");
const {
  getProfile,
  getAllUser,
  updateUser,
  deleteUser,
  updateUserRole,
} = require("../controllers/user.controller");
const { authorizeRoles } = require("../middlewares/authenticate");
const { ROLES } = require("../utils/enums");

const router = express.Router();

router.get("/profile", getProfile);
router.put("/profile", updateUser);

router.get("/", authorizeRoles([ROLES.ADMIN, ROLES.MODERATOR]), getAllUser);
router.put("/:userId", authorizeRoles([ROLES.ADMIN]), updateUserRole);
router.delete("/:userId", authorizeRoles([ROLES.ADMIN]), deleteUser);

module.exports = router;
