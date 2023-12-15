const {
  createPostController,
  getPosts,
  deletePostById,
  getPostById,
} = require("../controllers/postsControllers");

const createPostsHandler = async (req, res) => {
  const { id, role } = req.user;
  const { text, image, card_image, card_title, card_text } = req.body;
  try {
    if (role === "admin") {
      const response = await createPostController(text,image,card_image,card_title,card_text, id);
      return res.status(200).json(response);
    }
    throw new Error("you dont have permition to post");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPostsHandler = async (req, res) => {
  try {
    const response = await getPosts();
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

module.exports = {
  createPostsHandler,
  getPostsHandler,
  deletePost,
  getPostByIdHandler,
};
