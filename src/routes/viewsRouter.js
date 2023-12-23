const { Router } = require("express");
const { verifyAccessToken } = require("../middlewares/auth");
const {
  postViewsHandler,
  getViewsHandler,
} = require("../handlers/viewsHandlers");

const viewsRouter = Router();

viewsRouter.post("/:ip", postViewsHandler);
viewsRouter.get("/",verifyAccessToken, getViewsHandler);

module.exports = viewsRouter;
