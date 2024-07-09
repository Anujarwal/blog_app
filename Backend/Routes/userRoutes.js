const expree = require("express");
const {
  userRegister,
  userLogin,
  protectedResp,
} = require("../Controller/userController");

const protectedAuth = require("../Middleware/authMiddleware");


const route = expree.Router();

route.post("/", userRegister);
route.post("/login", userLogin);
route.post("/protected", protectedAuth, protectedResp);

module.exports = route;
