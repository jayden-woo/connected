const getAllPosts = (req, res) => {
  const user = req.query.user;
  if (!user) res.send("all posts");
  else res.send(`posts created by ${user}`);
};

const getPostByID = (req, res) => {
  res.send(`post of id ${req.params.id}`);
};

const addPost = (req, res) => {
  res.send("add a post");
};

const updatePost = (req, res) => {
  res.send(`update post ${req.params.id}`);
};

const deletePost = (req, res) => {
  res.send(`delete post ${req.params.id}`);
};

module.exports = { getAllPosts, getPostByID, addPost, updatePost, deletePost };
