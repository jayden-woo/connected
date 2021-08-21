const { Post, validate } = require("../models/post");

const getAllPosts = async (req, res) => {
  const user = req.query.user;
  let posts;
  if (!user) {
    posts = await Post.find().select("-comments").sort("-creationDate");
  } else {
    posts = await Post.find({ uid: user })
      .select("-comments")
      .sort("-creationDate");
  }
  res.send(posts);
};

const getPostByID = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post)
    return res.status(404).send("The post with the given ID was not found.");

  res.send(post);
};

const addPost = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0]);

  const post = new Post({
    uid: req.body.uid,
    title: req.body.title,
    content: req.body.content,
  });
  await post.save();

  res.send(post);
};

const updatePost = async (req, res) => {
  const { error } = validate(req.body, true);
  if (error) return res.status(400).send(error.details[0].message);

  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!post)
    return res.status(404).send("The post with the given ID was not found.");

  res.send(post);
};

const deletePost = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post)
    return res.status(404).send("The post with the given ID was not found.");

  res.send(post);
};

module.exports = { getAllPosts, getPostByID, addPost, updatePost, deletePost };
