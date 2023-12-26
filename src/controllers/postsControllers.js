const { posts, subject } = require("../db");
const { Op } = require("sequelize");
const createPostController = async (
  text,
  image,
  card_image,
  card_title,
  card_text,
  id,
  subj
) => {
  const subjectInstance = await subject.findOne({ where: { subj } })
  if (!subjectInstance) {
    throw new Error("Subject not found");
  }
  if (!subjectInstance.id) {
    throw new Error("Invalid subject id");
  }
  const Post = await posts.create({
    text,
    image,
    card_image,
    card_title,
    card_text,
    subjectId: subjectInstance.id,
  });

  Post.setUser(id);
  return Post;
};
const getAllPosts = async (partialTitle, subj) => {
  if (subj==="all") {
    return await posts.findAll({
      where: { card_title: { [Op.iLike]: partialTitle + "%" }}
    });
  }
  else {
    const findSubject = await subject.findOne({ where: { subj } })
    if (findSubject) {
       return await posts.findAll({
         where: { card_title: { [Op.iLike]: partialTitle + "%" }, subjectId:findSubject.id }
       });
    }
    
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
  getAllPosts,
};
