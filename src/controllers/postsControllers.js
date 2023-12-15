const { posts } = require("../db");

const createPostController = async (
  text,
  image,
  card_image,
  card_title,
  card_text,
  id
) => {
  const Post = await posts.create({
    text,
    image,
    card_image,
    card_title,
    card_text
  });
  Post.setUser(id);
  return Post;
};
const getPosts = async () => {
  return await posts.findAll();
};
const getPostById = async (postId) => {
  return await posts.findOne({ where: { id: postId } });
};

const deletePostById = async (id) => {
  const post = await posts.findOne({ where: { id } });
  if (post) {
    return await post.destroy();
  }
  return
};

module.exports = {
  createPostController,
  getPosts,
  deletePostById,
  getPostById,
};
