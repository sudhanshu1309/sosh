const Blog = require("../models/blog");

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    return res.status(200).json({
      success: true,
      blogs: blogs,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error,
    });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    return res.status(200).json({
      success: true,
      blog: blog,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.body;
  try {
    const blog = await Blog.findByIdAndDelete({ _id: id });
    if (!blog) {
      return res.status(400).json({
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      blog: blog,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error,
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    });
    if (!blog) {
      return res.status(400).json({
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      blog: blog,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error,
    });
  }
};
