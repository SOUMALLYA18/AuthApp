const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).send("Your Account Already Exists,Please login");
    }
    let salt = await bcrypt.genSalt();
    let hash = await bcrypt.hash(password, salt);
    user = await userModel.create({
      name,
      email,
      password: hash,
    });

    let token = generateToken({ email });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 60 * 60 * 1000,
    });
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send("Email or password incorrect");
    }
    let result = await bcrypt.compare(password, user.password);
    if (result) {
      let token = generateToken({ email });
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 60 * 60 * 1000,
      });
      res.status(201).send("logged in successfully");
    } else {
      return res.status(500).send("Email or password incorrect");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports.logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
  });
  res.status(201).send("logged out successfully");
};

module.exports.getUserProfile = (req, res) => {
  res.send("You are Loggedin");
};
