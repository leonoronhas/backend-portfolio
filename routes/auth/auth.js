const router = require("express").Router();

const authController = require("../../controllers/authController");

// POST -> /auth/login
router.post("/login", authController.login);

// POST => /auth/signup
router.post("/signup", authController.signup);

module.exports = router;
