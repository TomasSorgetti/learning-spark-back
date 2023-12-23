const { balance } = require("../db");

const incomeController = async (value) => {
  const findBalance = await balance.findOne({ where: { id: 1 } });
  if (!findBalance) {
    throw new Error("balance do not exist");
  } else {
    const integerValue = parseInt(value, 10);
    findBalance.income += integerValue;
    await findBalance.save();
    return findBalance;
  }
};
const expensesController = async (value) => {
  const findBalance = await balance.findOne({ where: { id: 1 } });
  if (!findBalance) {
    throw new Error("balance do not exist");
  } else {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      findBalance.expenses += numericValue;
      await findBalance.save();
      return findBalance;
    } else {
      throw new Error("is not a valid number ");
    }
  }
};
const getBalanceController = async () => {
  const findBalance = await balance.findAll();
  if (findBalance.length === 0) {
    const newBalance = await balance.create({ income: 0, expenses: 0 });
    return newBalance;
  }
  return findBalance;
};

module.exports = {
  incomeController,
  expensesController,
  getBalanceController,
};
