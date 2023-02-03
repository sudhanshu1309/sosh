const Blog = require("../models/blog");

exports.getBlogs = async () => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json({
      success: true,
      blogs: blogs,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: error,
    });
  }
};

exports.createBlog = async () => {
  try {
    const blog = await Blog.create(req.body);
    res.status(200).json({
      success: true,
      blog: blog,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: error,
    });
  }
};
