const User = require("../models/userModels");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    let token;
  
    console.log(req.headers);
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decord = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decord.id).select("-password");
        if (!req.user) {
          res.status(401);
          throw new Error("Not authorized");
        }
        next();
      } catch (error) {
          console.log(error)
        res.status(401);
        throw new Error("Not authorized");
      }
  
      if (!token) {
        res.status(400);
        throw new Error("Not authorized");
      }
    }
  });
  
  module.exports = { protect };