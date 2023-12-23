const { Router } = require("express");
const userRouter = require("./userRouter")
const postsRouter = require("./postsRouter");
const viewsRouter = require("./viewsRouter");
const balanceRouter = require("./balanceRouter");
const createAdmin = require("../middlewares/autoCreateAdmin")
const router = Router();

router.use(createAdmin);



router.use("/user", userRouter);
router.use("/posts", postsRouter);
router.use("/views", viewsRouter);
router.use("/balance", balanceRouter);

module.exports = router;
