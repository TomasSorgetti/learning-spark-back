const { Router } = require("express");
const { verifyAccessToken } = require("../middlewares/auth");
const {
  createPostsHandler,
  getPostsHandler,
  deletePost,
  getPostByIdHandler,
} = require("../handlers/postsHandlers");

const postsRouter = Router();

postsRouter.post("/", verifyAccessToken, createPostsHandler);
postsRouter.delete("/:id",verifyAccessToken, deletePost);
postsRouter.get("/", getPostsHandler);
postsRouter.get("/:postId", getPostByIdHandler);

module.exports = postsRouter;
