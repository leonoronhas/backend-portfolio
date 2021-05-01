const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      console.log("User not found, please contact Leo to sign up");
    }

    const hashPassword = await bcrypt.compare(password, loadedUser.password);

    if (!hashPassword) {
      res.status(401).json({
        error: "Incorrect Email or Password",
      });
    }

    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      process.env.JWT_TOKEN
    );

    res.status(200).json({
      message: "Token Created",
      token: token,
      user: loadedUser,
    });
  } catch (err) {
    console.log("DB error while trying to login");
    console.log(err);
  }
};

exports.signup = async (req, res) => {
  let user;

  try {
    const email = req.body.email;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 12);

    if (hashedPassword) {
      user = new User({
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
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};
