const express = require("express");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const { authenticate } = require("../middlewares/authenticate");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", authenticate, userRoutes);

module.exports = router;
