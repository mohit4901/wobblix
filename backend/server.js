import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'

import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// ---------------- APP CONFIG ----------------
const app = express()
const port = process.env.PORT || 4000

// ---------------- DB & CLOUD ----------------
connectDB()
connectCloudinary()


// ---------------- MIDDLEWARES ----------------
app.use(express.json())

// ✅ SIMPLE + WORKING CORS (PRODUCTION SAFE)
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:5176',

  

    
      
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true
  })
)

// ✅ HEALTH ROUTE (Render warmup)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// ✅ PREFLIGHT (MUST)
app.options('*', cors())

// ---------------- API ROUTES ----------------
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// ---------------- TEST ROUTE ----------------
app.get('/', (req, res) => {
  res.send('API Working 🚀')
})

// ---------------- START SERVER ----------------
app.listen(port, () => {
  console.log('Server started on PORT : ' + port)
})



