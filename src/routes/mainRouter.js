const { Router } = require("express");
const userRouter = require("./userRouter")
const postsRouter = require("./postsRouter");
const viewsRouter = require("./viewsRouter");
const createAdmin = require("../middlewares/autoCreateAdmin")
const router = Router();

router.use(createAdmin);

router.use("/user", userRouter);
router.use("/posts", postsRouter);
router.use("/views", viewsRouter);

module.exports = router;
