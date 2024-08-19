import express from 'express'
import productsRouter from './routes/products.js'
import usersRouter from './routes/users.js'

let port = process.env.PORT || 5001
const app = express()

app.use('/products', productsRouter)
app.use('/users', usersRouter)