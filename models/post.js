const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  stocks: {
    type: String,
    default: 0,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("post", PostSchema);
