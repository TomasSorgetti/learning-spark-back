const { Op } = require("sequelize");
const { views } = require("../db");

const postView = async (ip) => {
  const existIp = await views.findOne({ where: { ip } });
  if (existIp) throw new Error("ip already exist");
  else {
    return await views.create({ ip });
  }
};

const getViews = async () => {
  const res = await views.findAll();
  const currentDate = new Date();
  const lastMonthDate = new Date(currentDate);
  lastMonthDate.setMonth(currentDate.getMonth() - 1);
  const lastMonthViews = await views.findAll({
    where: {
      createdAt: {
        [Op.between]: [lastMonthDate, currentDate], // Filtrar por fecha
      },
    },
  });
  return { total: res.length, lastMonth: lastMonthViews.length };
};

module.exports = {
  postView,
  getViews,
};
