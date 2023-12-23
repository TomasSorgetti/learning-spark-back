const {
  incomeController,
  expensesController,
  getBalanceController,
} = require("../controllers/balanceControllers");

const incomeHandler = async (req, res) => {
  const { role } = req.user;
  const { value } = req.body;

  try {
    if (role === "admin") {
      const response = await incomeController(value);
      return res.status(200).json(response);
    }
    throw new Error("you dont have permition to post");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const expensesHandler = async (req, res) => {
  const { role } = req.user;
  const { value } = req.body;
  try {
    if (role === "admin") {
      const response = await expensesController(value);
      return res.status(200).json(response);
    }
    throw new Error("you dont have permition to post");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getBalanceHandler = async (req, res) => {
  const { role } = req.user;
  try {
    if (role === "admin") {
      const response = await getBalanceController();
      return res.status(200).json(response);
    }
    throw new Error("you dont have permition to post");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  incomeHandler,
  expensesHandler,
  getBalanceHandler,
};
