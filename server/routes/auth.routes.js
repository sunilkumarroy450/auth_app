const express = require("express");
const {
  register,
  login,
  fetchProfile,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, fetchProfile);

module.exports = router;
