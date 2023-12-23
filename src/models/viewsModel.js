const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Views = sequelize.define(
    "views",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      ip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: "views",
    }
  );

  return Views;
};
