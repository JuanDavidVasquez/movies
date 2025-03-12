import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { Category } from "../models/Category";
import { Movie } from "../models/Movie";

dotenv.config();

export const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres", 
  models: [Category, Movie], 
  dialectOptions: {
    ssl: {
      require: false,
    },
  },
});

export default db;
