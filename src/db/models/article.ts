import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface ArticleAttributes {
  id: number;
  nickname: string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ArticleInput extends Optional<ArticleAttributes, 'id'> {}
export interface ArticleOuput extends Required<ArticleAttributes> {}

class Article extends Model<ArticleAttributes, ArticleInput> implements ArticleAttributes {
  public id!: number
  public nickname!: string
  public title!: string
  public content!: string

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Article.init({
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

export default Article
