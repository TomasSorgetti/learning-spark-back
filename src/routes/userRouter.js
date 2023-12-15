const { Router } = require("express");
const { verifyAccessToken } = require("../middlewares/auth");
const {
  postUserHandler,
  getUserHandler,
  LoginHandler,
  LoginDashboardHandler,
} = require("../handlers/userHandlers");

const userRouter = Router();

userRouter.post("/", postUserHandler);
userRouter.post("/login", LoginHandler);
userRouter.post("/dashboard/login", LoginDashboardHandler);
userRouter.get("/", verifyAccessToken, getUserHandler);

module.exports = userRouter;