import express from 'express' 
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import movie from './routes/movieRouter'
import category from './routes/categoryRouter'

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

app.use('/api/movies', movie)
app.use('/api/categories', category)



export default app