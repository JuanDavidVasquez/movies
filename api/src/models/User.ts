import { Table, Column, Model, DataType, BelongsToMany, BeforeCreate, BeforeUpdate } from "sequelize-typescript";
import bcrypt from "bcryptjs";
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
  declare name: string;  // Usamos `declare` para evitar shadowing

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;  // Usamos `declare` para evitar shadowing

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;  // Usamos `declare` para evitar shadowing

  @BelongsToMany(() => Movie, () => UserMovie)
  declare watchedMovies: Movie[];

  // 🔒 Hashear la contraseña antes de crear o actualizar
  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(user: User) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }

  // Ocultar contraseña y timestamps en las respuestas JSON
  toJSON() {
    const values = super.toJSON();
    delete values.password;
    delete values.createdAt;
    delete values.updatedAt;
    return values;
  }
}

export default User;
