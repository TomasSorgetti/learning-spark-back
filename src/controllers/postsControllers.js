const { posts } = require("../db");
const { Op } = require("sequelize");
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
const getOrderedPosts = async (partialTitle, direction) => {
  let orderField = "card_title";
  let orderDirection = "ASC";
  if (direction === "desc") {
    orderDirection = "DESC";
  }
  const res = await posts.findAll({
    where: { card_title: { [Op.iLike]: partialTitle + "%" } },
    order: [[orderField, orderDirection]],
  });
  return res;
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
const modifyPostById = async (
  id,
  text,
  image,
  card_image,
  card_title,
  card_text
) => {
  const post = await posts.findOne({ where: { id } });
  if (!post) {
    throw new Error("post do not exist");
  }
  post.text = text || post.text
  post.image = image || post.image;
  post.card_image = card_image || post.card_image;
  post.card_title = card_title || post.card_title;
  post.card_text = card_text || post.card_text
  await post.save()
};

module.exports = {
  createPostController,
  deletePostById,
  getPostById,
  modifyPostById,
  getOrderedPosts,
};
