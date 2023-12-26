const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Subject = sequelize.define(
    "subject",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      subj: {
        type: DataTypes.STRING,
        unique:true
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: "subject",
    }
  );

  return Subject;
};
