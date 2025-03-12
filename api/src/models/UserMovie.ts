import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import { User } from "./User";
import { Movie } from "./Movie";

@Table({
  tableName: "user_movies",
  timestamps: true,
})
export class UserMovie extends Model<UserMovie> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @ForeignKey(() => Movie)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  movieId: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  watchedAt: Date;
}

export default UserMovie;
