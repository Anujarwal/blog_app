const Blog = require("../models/blogModels");
const User = require("../models/userModels");
const asyncHandler = require("express-async-handler");

const allBlog = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  // all Blog

  const blog = await Blog.find({ user: req.user._id });
  if (!blog) {
    res.status(400);
    throw new Error("Blogs not found");
  }

  res.status(200).json(blog);
});

const singleBlog = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  // single Blog
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(400);
    throw new Error("Blog not found");
  }

  res.status(200).json(blog);
});

const createBlog = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  //

  const { title, description, category, author, image, status } = req.body;

  if (!title || !description || !category || !author || !image || !status) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const blog = await Blog.create({
    user: req.user._id,
    image: req.file.path,
    title,
    description,
    category,
    author,
    status: "open",
  });

  if (!blog) {
    res.status(400);
    throw new Error("Blog not created");
  }

  res.status(200).json(blog);
});

const updateBlog = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!blog) {
    res.status(400);
    throw new Error("Blog Connot be updated");
  }

  res.status(200).json(blog);
});

const deleteBlog = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  const blog = await Blog.findByIdAndDelete(req.params.id);

  if (!blog) {
    res.status(400);
    throw new Error("Blog Connot be deleted");
  }

  res.status(200).json({ success: true });
});

module.exports = { allBlog, singleBlog, createBlog, updateBlog, deleteBlog };
