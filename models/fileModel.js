const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  path: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("File", fileSchema);
