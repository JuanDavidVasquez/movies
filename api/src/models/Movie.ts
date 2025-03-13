import { Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany } from "sequelize-typescript";
import { Category } from "./Category";
import { User } from "./User";
import { UserMovie } from "./UserMovie";

@Table({
  tableName: "movies",
  timestamps: false,
})
export class Movie extends Model<Movie> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  releaseDate: Date;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  categoryId: string;

  @BelongsTo(() => Category)
  category: Category;

  @BelongsToMany(() => User, () => UserMovie)
  declare usersWhoWatched: User[];

}

export default Movie;
