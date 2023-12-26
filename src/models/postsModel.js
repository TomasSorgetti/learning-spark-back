const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Posts = sequelize.define(
    "posts",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue:
          "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1356&h=668&fit=crop",
      },
      card_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      card_text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      card_image: {
        type: DataTypes.STRING,
        defaultValue:
          "https://www.timeshighereducation.com/student/sites/default/files/istock-499343530.jpg",
      },
      subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: "posts",
    }
  );
    
  return Posts;
};
