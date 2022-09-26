const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  login: [String],
  email: String,
  password: String,
  cpf: String,
  tel: String,
  date: String,
  nameMother: String,
  insert: String,
  update: String || null,
  status: String,
});

module.exports = mongoose.model("User", UserSchema);
