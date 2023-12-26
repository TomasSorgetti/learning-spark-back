const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Income = sequelize.define(
    "income",
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
      tableName: "income",
    }
  );

  return Income;
};
