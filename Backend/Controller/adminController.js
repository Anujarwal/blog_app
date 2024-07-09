const asyncHandler = require("express-async-handler")
const Blog = require("../models/blogModels")

const getAllBlogs = asyncHandler(async (req , res) => {
    const blog = await Blog.find();
    res.status(200).json(blog)
})

module.exports = {getAllBlogs}