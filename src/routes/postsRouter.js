const { Router } = require("express");
const { verifyAccessToken } = require("../middlewares/auth");
const {
  createPostsHandler,
  deletePost,
  getPostByIdHandler,
  modifyPost,
  getAllPostsHandler,
} = require("../handlers/postsHandlers");

const postsRouter = Router();

postsRouter.post("/", verifyAccessToken, createPostsHandler);
postsRouter.delete("/:id",verifyAccessToken, deletePost);
postsRouter.put("/:id",verifyAccessToken, modifyPost);
postsRouter.get("/", getAllPostsHandler);
postsRouter.get("/:postId", getPostByIdHandler);

module.exports = postsRouter;
