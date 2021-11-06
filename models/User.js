let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let userSchema = new Schema({
  fullName: String,
  email: String,
  password: String,
  number: String,
});
module.exports = mongoose.model("User", userSchema);
