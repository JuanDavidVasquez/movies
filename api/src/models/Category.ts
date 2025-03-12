import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Movie } from "./Movie";

@Table({
  tableName: "categories",
  timestamps: false,
})
export class Category extends Model<Category> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @HasMany(() => Movie) 
  movies: Movie[];
}

export default Category;