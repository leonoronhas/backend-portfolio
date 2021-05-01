const Project = require("../models/project");

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    if (!projects) {
      res.status(403).json({
        error: "Projects not found",
      });
    } else {
      res.status(200).json({
        message: "Projects fetched successfully",
        projects,
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const getProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);

    if (!project) {
      res.status(403).json({
        error: "Project not found",
      });
    } else {
      res.status(200).json({
        message: "Project fetched successfully",
        project,
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const addProject = async (req, res) => {
  try {
    const { name, link, github_link, description, technologies } = req.body;
    const projectPicture = req.file;

    console.log(profilePicture);

    const project = new Project({
      name: name,
      link: link,
      github_link: github_link,
      description: description,
      technologies: technologies,
      project_picture: projectPicture,
    });

    if (!project) {
      res.status(500).json({
        error: "Unable to add project, check input and try again",
      });
    } else {
      await project.save();

      res.status(200).json({
        message: "Project added successfully",
        project,
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const updateProject = async (req, res) => {};
const deleteProject = async (req, res) => {};

module.exports = {
  getAllProjects,
  getProject,
  addProject,
};
