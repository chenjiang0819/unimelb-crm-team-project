const { Post, validate } = require("../models/post");
const { historyValidationSchema } = require("../models/history");

const getAllPosts = async (req, res) => {
  const user = req.query.user;
  let posts;
  if (!user) {
    posts = await Post.find().sort("-createdAt");
    // posts = await Post.find().select("-comments").sort("-updatedAt");
  } else {
    posts = await Post.find({ "author.uid": user }).sort("-createdAt");
    // posts = await Post.find({ uid: user })
    //   .select("-comments")
    //   .sort("-updatedAt");
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
    // uid: req.body.uid,
    author: req.body.author,
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

const editPost = async (req, res) => {
  const { error } = historyValidationSchema.validate(req.body.history);
  if (error) return res.status(400).send(error.details[0].message);

  const post = await Post.findByIdAndUpdate(req.params.id, {
    $push: { history: req.body.history }
  }, {
    new: true,
  });
  if (!post)
    return res.status(404).send("The post with the given ID was not found.");

  post.title = req.body.title;
  post.content = req.body.content;
  await post.save()

  res.send(post);
};

const addComments = async (req, res) => {
  const { error } = validate(req.body, true);
  if (error) return res.status(400).send(error.details[0].message);

  const post = await Post.findByIdAndUpdate(req.params.id, {
    $push: { comments: { $each: req.body.comments} }
  }, {
    new: true,
  });
  if (!post)
    return res.status(404).send("The post with the given ID was not found.");

  res.send(post);
}

const editComment = async (req, res) => {
  const { error } = historyValidationSchema.validate(req.body.history);
  if (error) return res.status(400).send(error.details[0].message);

  const post = await Post.findById(req.params.id);
  if (!post)
    return res.status(404).send("The post with the given ID was not found.");

  const index = post.comments.map((comment) => {return comment._id}).indexOf(req.params.cid);

  post.comments[index].content = req.body.content;
  post.comments[index].history.push(req.body.history);
  await post.save();

  res.send(post);
};

const deletePost = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post)
    return res.status(404).send("The post with the given ID was not found.");

  res.send(post);
};

const deleteComment = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post)
    return res.status(404).send("The post with the given ID was not found.");

  const index = post.comments.map((comment) => {return comment._id}).indexOf(req.params.cid);

  if (index < 0)
    return res.status(404).send("The comment with the given ID was not found.");

  post.comments.splice(index, 1);
  await post.save();

  res.send(post);
}

module.exports = {
  getAllPosts,
  getPostByID,
  addPost,
  updatePost,
  editPost,
  addComments,
  editComment,
  deletePost,
  deleteComment
};
