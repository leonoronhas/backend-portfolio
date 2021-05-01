const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    res.status(401).json({
      error: "Not authorized",
    });
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  } catch (err) {
    res.status(500).json({
      err,
    });
  }

  if (!decodedToken) {
    const error = new Error("Not authenticated");
    res.status(401).json({
      error,
    });
  }

  req.userId = decodedToken.userId;
  next();
};
