var express = require("express");
var router = express.Router();

const {
  getBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blog");
const { isSignedIn } = require("../controllers/auth");

router.get("/blog", getBlogs);
router.post("/blog", isSignedIn, createBlog);
router.put("/blog", isSignedIn, updateBlog);
router.delete("/blog", isSignedIn, deleteBlog);

module.exports = router;
