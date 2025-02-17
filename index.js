import express from 'express'
import productsRouter from './routes/products.js'
import usersRouter from './routes/users.js'
import cors from 'cors'
let port = process.env.PORT || 5001
const app = express()
app.use(express.static('public'))
app.use(express.json())
app.use(cors({
  origin: '*',
  credentials:true
}))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Request-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Expose-Headers", "Authorization");
  next();
});


app.use('/products', productsRouter)
app.use('/users', usersRouter)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })