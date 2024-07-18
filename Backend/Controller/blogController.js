const Blog = require("../models/blogModels");
const User = require("../models/userModels");
const asyncHandler = require("express-async-handler");

const allBlog = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  console.log(req.user);

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

  if (blog.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  res.status(200).json(blog);
});

// blog create

const createBlog = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  const { title, description, image, category } = req.body;

  if (!title || !description || !image || !category) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const blog = await Blog.create({
    user: req.user._id,
    image,
    title,
    description,
    category,
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

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(400);
    throw new Error("Blog not found");
  }

  if (blog.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedBlog);
});

const deleteBlog = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(400);
    throw new Error("Blog not found");
  }

  if (blog.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Blog.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true });
});

module.exports = { allBlog, singleBlog, createBlog, updateBlog, deleteBlog };
