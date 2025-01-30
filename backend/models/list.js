const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  username: String,
});

module.exports = mongoose.model("List", listSchema);
