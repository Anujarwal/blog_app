const expree = require("express");
const {
  allBlog,
  singleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../Controller/blogController");

const route = expree.Router();

route.get("/", allBlog);

route.get("/:id", singleBlog);

route.post("/", createBlog);

route.put("/:id", updateBlog);

route.delete("/:id", deleteBlog);

module.exports = route;
