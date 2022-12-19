import { Article, Comment } from './models';
// const isDev = process.env.NODE_ENV === 'development';
const isDev = false;
const dbInit = () => {
  Article.sync({ alter: isDev });
  Comment.sync({ alter: isDev });
};
export default dbInit;
