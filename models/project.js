const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    github_link: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologies: {
      type: String,
      required: true,
    },
    project_picture: {
      type: Schema.Types.Mixed,
      default: {},
      required: true
    },
  },
  { timestamps: true, minimize: false }
);

module.exports = mongoose.model("Project", projectSchema);