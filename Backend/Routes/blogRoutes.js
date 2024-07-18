const expree = require("express");
const {
  allBlog,
  singleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../Controller/blogController");
const protectedAuth = require("../Middleware/authMiddleware");

const route = expree.Router();

route.get("/", protectedAuth, allBlog);
route.post("/", protectedAuth, createBlog);
route.get("/:id", protectedAuth, singleBlog);
route.post("/:id", protectedAuth, createBlog);
route.put("/:id", protectedAuth, updateBlog);
route.delete("/:id", protectedAuth, deleteBlog);

module.exports = route;
