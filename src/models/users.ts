import sequelize from "../sequelize";
import { Column, DataType, Table, Model } from "sequelize-typescript";

@Table({
  tableName: "users",
  modelName: "Users",
})
class User extends Model {
  @Column({
    primaryKey: true,
  })
  declare user_id: number;

  @Column({
    type: DataType.STRING,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
  })
  declare email: string;
}

export default User;
