const { Router } = require("express");
const { verifyAccessToken } = require("../middlewares/auth");
const {
  incomeHandler,
  expensesHandler,
  getBalanceHandler,
} = require("../handlers/balanceHandlers");

const balanceRouter = Router();

balanceRouter.put("/income", verifyAccessToken, incomeHandler);
balanceRouter.put("/expenses", verifyAccessToken, expensesHandler);
balanceRouter.get("/", verifyAccessToken, getBalanceHandler);

module.exports = balanceRouter;
