const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Balance = sequelize.define(
    "balance",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      income: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      expenses: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: "balance",
    }
  );

  return Balance;
};
