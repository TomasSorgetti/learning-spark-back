const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Expenses = sequelize.define(
    "expenses",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      value: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: "expenses",
    }
  );

  return Expenses;
};
