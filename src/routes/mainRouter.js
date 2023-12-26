const { Router } = require("express");
const userRouter = require("./userRouter")
const postsRouter = require("./postsRouter");
const viewsRouter = require("./viewsRouter");
const balanceRouter = require("./balanceRouter");
const subjectsRouter = require("./subjectsRouter");
const createAdmin = require("../middlewares/autoCreateAdmin");
const createSubjects = require("../middlewares/autoCreateSubjects");
const router = Router();

router.use(createAdmin);
router.use(createSubjects);



router.use("/user", userRouter);
router.use("/posts", postsRouter);
router.use("/views", viewsRouter);
router.use("/balance", balanceRouter);
router.use("/subjects",subjectsRouter);

module.exports = router;
