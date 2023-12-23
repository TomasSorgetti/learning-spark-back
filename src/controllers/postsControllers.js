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
    card_text,
  });
  Post.setUser(id);
  return Post;
};
const getOrderedPosts = async (partialTitle, filter, direction) => {
  let orderDirection = "ASC";
  if (direction === "desc") {
    orderDirection = "DESC";
  }
  if (filter === "name") {
    const res = await posts.findAll({
      where: { card_title: { [Op.iLike]: partialTitle + "%" } },
      order: [["card_title", orderDirection]],
    });
    return res;
  } else if (filter === "date") {
    const res = await posts.findAll({
      where: { card_title: { [Op.iLike]: partialTitle + "%" } },
      order: [["createdAt", orderDirection]],
    });
    return res;
  }
};

const getPostById = async (postId) => {
  return await posts.findOne({ where: { id: postId } });
};

const deletePostById = async (id) => {
  const post = await posts.findOne({ where: { id } });
  if (post) {
    return await post.destroy();
  }
  return;
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
  post.text = text || post.text;
  post.image = image || post.image;
  post.card_image = card_image || post.card_image;
  post.card_title = card_title || post.card_title;
  post.card_text = card_text || post.card_text;
  await post.save();
};

module.exports = {
  createPostController,
  deletePostById,
  getPostById,
  modifyPostById,
  getOrderedPosts,
};
