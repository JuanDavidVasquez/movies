import express from 'express' 
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import movie from './routes/movieRouter'
import category from './routes/categoryRouter'
import user from './routes/userRouter'
import auth from './routes/authRoute'
import { seedCategories } from "./seeders/seedCategories";

async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
    console.log('Database connected'.cyan.bold)
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
  }
}

connectDB()

const app = express()

app.use(morgan('dev'))

app.use(express.json())


seedCategories();

app.use('/api/movies', movie)
app.use('/api/categories', category)
app.use('/api/users', user)
app.use('/api/auth', auth)




export default app