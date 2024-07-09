const expree = require("express");
const { userRegister, userLogin, protectedResp } = require("../Controller/userController");
const { protect } = require("../Middleware/authMiddleware");

const route = expree.Router();

route.post("/", userRegister);

route.post("/login", userLogin);
route.post("/protected", protect , protectedResp);

module.exports = route;
