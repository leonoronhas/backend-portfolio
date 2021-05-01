const express = require("express");
const routes = express.Router();
const { handleUploadMiddleware } = require("../uploadSetup");
const isAuth = require("../middleware/is-auth");

const authRoutes = require("./auth");
const projectRoutes = require("./projects");
const experienceRoutes = require("./experience");
const educationRoutes = require("./education");

routes.use("/auth", authRoutes);
// routes.use("/projects", projectRoutes);
// routes.use("/experience", experienceRoutes);
// routes.use("/education", educationRoutes);

module.exports = routes;
