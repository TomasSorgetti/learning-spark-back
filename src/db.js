require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const userModel = require("./models/userModel");
const postsModel = require("./models/postsModel");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { logging: false }
);

userModel(sequelize);
postsModel(sequelize);

const { user, posts } = sequelize.models;

user.hasMany(posts);
posts.belongsTo(user);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};