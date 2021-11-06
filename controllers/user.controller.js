const User = require("../models/user");
let bc = require("bcryptjs");
let jwt = require("jsonwebtoken");
let config = require("config");
let secret = config.get("secret");
exports.sinUp = async (req, res) => {
  let { fullName, email, number, password } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ msg: "user orledy exiest" });
    }
    let newUser = new User({
      fullName,
      email,
      number,
      password,
    });

    let salt = await bc.genSalt(10);
    let hash = await bc.hashSync(password, salt);
    newUser.password = hash;
    await newUser.save();
    let payload = {
      id: newUser._id,
      fullName: newUser.fullName,
      password: newUser.password,
    };
    let token = jwt.sign(payload, secret);
    res.send({
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        number: newUser.number,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.login = async (req, res) => {
  let { email, password } = req.body;
  try {
    let theUser = await User.findOne({ email });
    if (!theUser) {
      res.status(400).json({ msg: "invalid email or password" });
    }
    let isMatch = await bc.compare(password, theUser.password);
    if (!isMatch) {
      res.status(400).json({ msg: "invalid email or password " });
    }
    let payload = {
      id: theUser._id,
      email: theUser.email,
    };
    let token = jwt.sign(payload, secret);
    res.send({
      token,
      user: {
        fullName: theUser.fullName,
        password: theUser.password,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getUser=(req,res)=>{
res.send(req.user)
}
