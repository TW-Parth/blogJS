import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface BlogAttributes {
  id: number;
  nickname: string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BlogInput extends Optional<BlogAttributes, 'id'> {}
export interface BlogOuput extends Required<BlogAttributes> {}

class Blog extends Model<BlogAttributes, BlogInput> implements BlogAttributes {
  public id!: number
  public nickname!: string
  public title!: string
  public content!: string

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Blog.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: true
})

export default Blog
