const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
      type: Array,
      required: true,
    },
    project_pictures: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true, minimize: false }
);

module.exports = mongoose.model("Project", projectSchema);