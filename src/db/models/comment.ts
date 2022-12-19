import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';
import { Article } from './index';

interface CommentAttributes {
  id: number;
  nickname: string;
  comment: string;
  articleId: number;
  commentId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CommentInput extends Optional<CommentAttributes, 'id' | 'commentId' | 'articleId'> {}
export interface CommentOuput extends Required<CommentAttributes> {}

class Comment extends Model<CommentAttributes, CommentInput> implements CommentAttributes {
  public id!: number;
  public nickname!: string;
  public comment!: string;
  public articleId!: number;
  public commentId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    articleId: {
      type: DataTypes.INTEGER,
    },
    commentId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
  },
);

export default Comment;
