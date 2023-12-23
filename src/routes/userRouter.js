const { Router } = require("express");
const { verifyAccessToken } = require("../middlewares/auth");
const {
  postUserHandler,
  getUserHandler,
  LoginHandler,
  LoginDashboardHandler,
  changeUserRoleHandler,
  deleteUserHandler,
  getUserByEmailHandler,
  getUserOrderedHandler,
} = require("../handlers/userHandlers");

const userRouter = Router();

userRouter.post("/", postUserHandler);
userRouter.post("/login", LoginHandler);
userRouter.post("/dashboard/login", LoginDashboardHandler);
userRouter.get("/", verifyAccessToken, getUserHandler);
userRouter.get("/userByEmail", verifyAccessToken, getUserByEmailHandler);
userRouter.get("/usersOrdered", verifyAccessToken, getUserOrderedHandler);
userRouter.put("/changeUserRole", verifyAccessToken, changeUserRoleHandler);
userRouter.delete("/:userId", verifyAccessToken, deleteUserHandler);

module.exports = userRouter;