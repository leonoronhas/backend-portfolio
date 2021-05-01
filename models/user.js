const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile_picture: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true, minimize: false }
);

module.exports = mongoose.model("User", userSchema);
