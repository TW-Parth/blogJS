import { Blog } from './models'
const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
  Blog.sync({ alter: isDev })
}
export default dbInit 
