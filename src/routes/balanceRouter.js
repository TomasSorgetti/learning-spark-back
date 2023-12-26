const { Router } = require("express");
const { verifyAccessToken } = require("../middlewares/auth");
const {
  incomeHandler,
  expensesHandler,
  getBalanceHandler,
} = require("../handlers/balanceHandlers");

const balanceRouter = Router();

balanceRouter.post("/income", verifyAccessToken, incomeHandler);
balanceRouter.post("/expenses", verifyAccessToken, expensesHandler);
balanceRouter.get("/", verifyAccessToken, getBalanceHandler);

module.exports = balanceRouter;
