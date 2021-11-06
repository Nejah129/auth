let jwt = require("jsonwebtoken");
const User = require("../models/user");
let config=require("config")
let secret = config.get("secret");
let auth = async (req, res, next) => {
  let token = req.headers.authorization;
  try {
    let decoded = jwt.verify(token, secret);
    let user = await User.findById(decoded.id);
    if (!user) {
      res.status(400).json({ msg: "not othraised" });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
module.exports = auth;
