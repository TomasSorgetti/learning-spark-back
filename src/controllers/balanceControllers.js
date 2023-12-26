const { Op } = require("sequelize");
const { income, expenses } = require("../db");

const incomeController = async (value) => {
  if (value !== 0) {
    return await income.create({ value });
  } else {
    throw new Error("0 is not valid");
  }
};
const expensesController = async (value) => {
  if (value !== 0) {
    return await expenses.create({ value });
  } else {
    throw new Error("0 is not valid");
  }
};
const getBalanceController = async () => {
  const currentDate = new Date();
  const lastYearDate = new Date(currentDate);
  lastYearDate.setFullYear(currentDate.getFullYear() - 1);
  const incomeFind = await income.findAll({
    where: {
      createdAt: {
        [Op.between]: [lastYearDate, currentDate],
      },
    },
  });
  const expensesFind = await expenses.findAll({
    where: {
      createdAt: {
        [Op.between]: [lastYearDate, currentDate],
      },
    },
  });
  if (incomeFind.length > 0 || expensesFind.length > 0) {
    const totalIncome = incomeFind.reduce((sum, obj) => sum + obj.value, 0);
    const totalExpenses = expensesFind.reduce((sum, obj) => sum + obj.value, 0);

    return {
      total: { totalIncome, totalExpenses },
      incomes: incomeFind,
      expenses: expensesFind,
    };
  } else {
    throw new Error("No income or expenses found");
  }
};

module.exports = {
  incomeController,
  expensesController,
  getBalanceController,
};
