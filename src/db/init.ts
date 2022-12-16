import { Article } from './models'
const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
  Article.sync({ alter: isDev })
}
export default dbInit 
