const Post = require("../models/Post");

// Show all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.render("home", { posts });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
};

// Show create form
exports.getCreatePost = (req, res) => {
  res.render("create");
};

// Create post
exports.createPost = async (req, res) => {
  try {
    if (!req.session.user) {
      req.flash("error", "You must log in to create a post");
      return res.redirect("/auth/login");
    }

    const { title, content } = req.body;
    await Post.create({
      title,
      content,
      author: req.session.user.userName,
    });
    
        req.flash("success", "Post Created Successfully");
        
    
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.redirect("/posts/create");
  }
};

// Single post
exports.getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.render("post", { post });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
};

// Edit form
exports.getEditPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.render("edit", { post });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
};

// Update
exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    await Post.findByIdAndUpdate(req.params.id, { title, content });
    res.redirect(`/posts/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.redirect(`/posts/edit/${req.params.id}`);
  }
};

// Delete
exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
};
