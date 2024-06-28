const express = require("express");
const {
  me,
  getAllUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const { authorizeRoles } = require("../middlewares/authenticate");

const router = express.Router();

router.get("/me", me);
router.get("/all-users", authorizeRoles(["admin", "moderator"]), getAllUser);
router.patch("/update/:id", authorizeRoles(["admin", "moderator"]), updateUser);
router.patch("/update",updateUser)
router.delete(
  "/delete/:id",
  authorizeRoles(["admin", "moderator"]),
  deleteUser
);

module.exports = router;
