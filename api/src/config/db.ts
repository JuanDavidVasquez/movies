import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { Category } from "../models/Category";
import { Movie } from "../models/Movie";
import {UserMovie} from "../models/UserMovie";
import {User} from "../models/User";

dotenv.config();

export const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres", 
  models: [User ,Category, Movie, UserMovie], 
  dialectOptions: {
    ssl: {
      require: false,
    },
  },
});

export default db;
