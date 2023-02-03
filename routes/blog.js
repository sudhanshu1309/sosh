var express = require("express");
var router = express.Router();

const { getBlogs, createBlog } = require("../controllers/blog");

router.get("/blogs", getBlogs);
router.post("/blog", createBlog);

module.exports = router;
