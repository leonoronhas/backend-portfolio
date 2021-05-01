const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      console.log("User not found, please contact Leo to sign up");
    }

    const hashPassword = await bcrypt.compare(password, user.password);

    if (!hashPassword) {
      res.status(401).json({
        error: "Incorrect Email or Password",
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.JWT_TOKEN
    );

    res.status(200).json({
      message: "Token Created",
      token: token,
      user: user,
    });
  } catch (err) {
    console.log("DB error while trying to login");
    console.log(err);
  }
};

const signup = async (req, res) => {
  let user;

  try {
    const { full_name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    if (hashedPassword) {
      user = new User({
        full_name: full_name,
        email: email,
        password: hashedPassword,
      });

      await user.save();

      res.status(200).json({
        message: "Account created",
        user,
      });
    } else {
      res.status(500).json({
        error: "Error hashing password",
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(403).json({
        error: "Email already in use, please use a different email to sign up",
      });
    }
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = {
  login,
  signup,
};
