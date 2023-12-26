const {
  createPostController,
  deletePostById,
  getPostById,
  modifyPostById,
  getAllPosts,
} = require("../controllers/postsControllers");

const createPostsHandler = async (req, res) => {
  const { id, role } = req.user;
  const { text, image, card_image, card_title, card_text,subj } = req.body;
  try {
    if (role === "admin") {
      const response = await createPostController(text,image,card_image,card_title,card_text, id,subj);
      return res.status(200).json(response);
    }
    throw new Error("you dont have permition to post");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllPostsHandler = async (req, res) => {
  const { partialTitle,subj } = req.query;
  try {
    const response = await getAllPosts(partialTitle, subj);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getPostByIdHandler = async (req, res) => {
  const { postId } = req.params;
  try {
    const response = await getPostById(postId);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  try {
    if (role === "admin") {
      const response = await deletePostById(id);
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const modifyPost = async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  const { text, image, card_image, card_title, card_text } = req.body;
  try {
    if (role === "admin") {
      const response = await modifyPostById(
        id,
        text,
        image,
        card_image,
        card_title,
        card_text
      );
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPostsHandler,
  deletePost,
  getPostByIdHandler,
  modifyPost,
  getAllPostsHandler,
};
