import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./users";
import Blog from "./blogs";

@Table({
  modelName: "Comment",
  tableName: "comment",
})
export class Comment extends Model {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  comment_id!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: true,
  })
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Blog)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: true,
  })
  blog_id!: number;

  @BelongsTo(() => Blog)
  blog!: Blog;

  // @Column({
  //   type: DataType.DATE,
  //   allowNull: true,
  // })
  // edited_at?: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false,
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updatedAt?: Date;
}
export default Comment;
