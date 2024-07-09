const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const jwt = require("jsonwebtoken");

const isAdmin = asyncHandler(async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        //Get Token from Header//
        token = req.headers.authorization.split(" ")[1];
  
        //Verify Token//
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
        //Get user from Token//
  
        req.user = await User.findById(decoded.id).select("-password");
  
        if (!req.user) {
          res.status(401);
          throw new Error("Admin Access Only");
        }
  
        if (req.user.isAdmin) {
          next();
        } else {
          res.status(401);
          throw new Error("Admin Access Only");
        }
      } catch (error) {
        console.log(error.message);
        res.status(400);
        throw new Error("Admin Access Only");
      }
    } else {
      res.status(400);
      throw new Error("Admin Access Only");
    }
    if (!token) {
      res.status(401);
      throw new Error("Admin Access Only");
    }
  });
  
  module.exports = isAdmin;