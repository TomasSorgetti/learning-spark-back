const { Router } = require("express");
const { subjectHandler } = require("../handlers/subjectsHandlers");

const subjectsRouter = Router();

subjectsRouter.get("/", subjectHandler);

module.exports = subjectsRouter;
