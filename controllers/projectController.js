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
    const { id, name, link, github_link, description, technologies } = req.body;
    const projectPicture = req.file;

    if (
      !id ||
      !name ||
      !link ||
      !github_link ||
      !description ||
      !technologies ||
      !projectPicture
    ) {
      res.status(500).json({
        error: "Unable to add project, check input and try again",
      });
    } else {
      const project = new Project({
        id: id,
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
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const {
      id,
      name,
      link,
      github_link,
      description,
      technologies,
    } = req.body;
    const projectId = req.params.id;
    const projectPicture = req.file;

    const oldProject = await Project.findById(projectId);

    if (!oldProject) {
      res.status(404).json({
        error: "Unable to find project, check input and try again",
      });
    } else {
      let updatedProject = oldProject;

      if (id) {
        updatedProject.id = id;
      }
      if (name) {
        updatedProject.name = name;
      }
      if (link) {
        updatedProject.link = link;
      }
      if (github_link) {
        updatedProject.github_link = github_link;
      }
      if (description) {
        updatedProject.description = description;
      }
      if (technologies) {
        updatedProject.technologies = technologies;
      }
      if (projectPicture) {
        updatedProject.project_picture = projectPicture;
      }

      const project = await Project.findByIdAndUpdate(
        projectId,
        updatedProject,
        {
          new: true,
        }
      );

      res.status(200).json({
        message: "Project updated successfully",
        project,
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);

    if (!project) {
      res.status(403).json({
        error: "Project not found",
      });
    } else {
      await Project.findByIdAndDelete(projectId);

      res.status(200).json({
        message: "Project deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

module.exports = {
  getAllProjects,
  getProject,
  addProject,
  updateProject,
  deleteProject,
};
