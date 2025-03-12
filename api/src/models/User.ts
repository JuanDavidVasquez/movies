import { Table, Column, Model, DataType, HasMany, BelongsToMany } from "sequelize-typescript";
import { Movie } from "./Movie";
import { UserMovie } from "./UserMovie";

@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model<User> {
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
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @BelongsToMany(() => Movie, () => UserMovie)
  watchedMovies: Movie[];
}

export default User;