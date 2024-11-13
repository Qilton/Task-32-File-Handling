const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const cors= require('cors')
const AuthRouter=require('./routes/AuthRouter')
const ProductRouter=require('./routes/productRouter')
require('dotenv').config()
require('./models/db')
const PORT= 8080

app.get('/',(req,res) => {
  res.send("Hello World")
}
)

app.use(
  cors()
  );
app.use(bodyParser.json())
app.use(cors())
app.use('/auth',AuthRouter)
app.use('/product',ProductRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
}
)