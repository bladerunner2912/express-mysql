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
  tableName: "comment", // Assuming the table name is 'comment'
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
    allowNull: true, // Depending on your requirements, you might want to set it to false if user_id is always required
  })
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Blog)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: true, // Depending on your requirements, you might want to set it to false if blog_id is always required
  })
  blog_id!: number;

  @BelongsTo(() => Blog)
  blog!: Blog;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  edited_at?: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false,
  })
  created_at!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updated_at!: Date;
}
export default Comment;
