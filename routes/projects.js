const router = require("express").Router();
const { handleUploadMiddleware } = require("../uploadSetup");

const projectController = require("../controllers/projectController");

// GET -> /project/all
router.get("/all", projectController.getAllProjects);

// GET -> /project/id
router.get("/:id", projectController.getProject);

// POST => /project/add
router.post(
  "/add",
  handleUploadMiddleware.single("project_picture"),
  projectController.addProject
);

// PUT => /project/update
router.put(
  "/update",
  handleUploadMiddleware.single("project_picture"),
  projectController.updateProject
);

// DELETE => /project/delete/:id
router.delete(
  "/delete/:id",
  projectController.deleteProject
);

module.exports = router;
