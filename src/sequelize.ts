import { Sequelize } from "sequelize-typescript";
import config from "./config";
import Blogs from "./models/blogs";
import User from "./models/users";
import Comment from "./models/comments";
const sequelize = new Sequelize({
  database: config.databaseName!,
  username: config.databaseUser!,
  password: config.databasePass!,
  host: "localhost",
  dialect: "mysql",
  models: [User, Blogs, Comment],
});

export default sequelize;
