const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const educationSchema = new Schema(
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
    gpa: {
      type: Number,
    },
    graduation_date: {
      type: String,
      required: true,
    },
    major: {
      type: String,
    },
  },
  { timestamps: true, minimize: false }
);

module.exports = mongoose.model("Education", educationSchema);
