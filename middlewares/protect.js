const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
module.exports.protect = async (req, res, next) => {
  if (req.cookies.token) {
    try {
      const data = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      req.user = await userModel
        .findOne({ email: data.email })
        .select("-password");
      next();
    } catch (error) {
      res.status(401).send("not Authorized");
    }
  }
  if (!req.cookies.token) {
    res.status(401).send("You Don't have permission To Access");
  }
};
