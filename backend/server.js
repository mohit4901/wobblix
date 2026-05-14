import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import hpp from 'hpp'

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

// ---------------- SECURITY MIDDLEWARES ----------------

// 1. SET SECURITY HTTP HEADERS (Optimized for Razorpay & Blobs)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://checkout.razorpay.com", "blob:"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com", "blob:"],
      connectSrc: ["'self'", "https://api.razorpay.com", "https://lumiere.razorpay.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
}))

// 2. RATE LIMITING (Prevent DDoS/Brute Force)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
})
app.use('/api/', limiter)

// 3. DATA SANITIZATION against NoSQL query injection
app.use(mongoSanitize())

// 4. DATA SANITIZATION against XSS
app.use(xss())

// 5. PREVENT HTTP PARAMETER POLLUTION
app.use(hpp())

// 6. BODY PARSER
app.use(express.json({ limit: '10kb' })) // Limit body size

// 7. CORS
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:5176',
      'https://wobblix.vercel.app',
      'https://wobblixclothing.in',
      'https://admin.wobblixclothing.in'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true
  })
)

// HEALTH ROUTE

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// FAVICON HANDLER

app.get('/favicon.ico', (req, res) => res.status(204).end());


// PREFLIGHT REQUESTS

app.options('*', cors())

// ---------------- API ROUTES ----------------
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// ---------------- TEST ROUTE ----------------
app.get('/', (req, res) => {
  res.send('API Working')

})

// ---------------- START SERVER ----------------
app.listen(port, () => {
  console.log('Server started on PORT : ' + port)
})



