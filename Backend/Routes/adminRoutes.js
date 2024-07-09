const express = require("express");
const { getAllBlogs } = require("../Controller/adminController");
const isAdmin = require("../Middleware/adminMeddleware");

const router = express.Router();

router.route("/blog").get(isAdmin, getAllBlogs);

module.exports = router;
