const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const experienceSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    job_title: {
      type: String,
      required: true,
    },
    start_date: {
      type: String,
      required: true,
    },
    end_date: {
      type: String,
      required: true,
      default: "Present",
    },
    job_duties: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, minimize: false }
);

module.exports = mongoose.model("Experience", experienceSchema);
