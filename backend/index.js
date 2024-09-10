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
const websites = [
  "localhost:3000",
  ];
app.use(
  cors({
  origin: websites,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  credentials: true,
  allowedHeaders: "Content-Type,Authorization",
  })
  );
app.use(bodyParser.json())
app.use(cors())
app.use('/auth',AuthRouter)
app.use('/product',ProductRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
}
)