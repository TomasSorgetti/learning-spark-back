require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const userModel = require("./models/userModel");
const postsModel = require("./models/postsModel");
const viewsModel = require("./models/viewsModel")
const incomeModel = require("./models/IncomeModel")
const expensesModel = require ("./models/expensesModel")
const subjectModel = require ("./models/subjectsModel")

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { logging: false }
);

userModel(sequelize);
postsModel(sequelize);
viewsModel(sequelize);
incomeModel(sequelize);
expensesModel(sequelize)
subjectModel(sequelize)


const { user, posts, subject } = sequelize.models;

user.hasMany(posts);
posts.belongsTo(user);
posts.belongsTo(subject, { foreignKey: "subjectId" });
subject.hasMany(posts)

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};