const express = require("express");
const { me } = require("../controllers/user.controller");

const router = express.Router();

router.get("/me",me)

module.exports = router;