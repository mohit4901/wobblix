import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import hpp from 'hpp'
import compression from 'compression'
import morgan from 'morgan'
import 'express-async-errors'

import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import mongoose from 'mongoose'

import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// ---------------- APP CONFIG ----------------
const app = express()
app.set('trust proxy', 1) 
const port = process.env.PORT || 4000

// ---------------- DB & CLOUD ----------------
connectDB()
connectCloudinary()

// ---------------- MIDDLEWARES ----------------

// 1. LOGGING (Production friendly)
app.use(morgan('combined'))

// 2. COMPRESSION (Speed up responses)
app.use(compression())

// 3. SECURITY HEADERS
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

// 4. RATE LIMITING
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes'
})
app.use('/api/', limiter)

// 5. DATA SANITIZATION
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

// 6. BODY PARSER
app.use(express.json({ limit: '10kb' }))

// 7. CORS
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'https://wobblix.vercel.app',
        'https://wobblix-4apk.vercel.app',
        'https://wobblixclothing.in',
        'https://www.wobblixclothing.in',
        'https://admin.wobblixclothing.in'
      ]

      // Allow all Vercel preview deployments (wobblix-*.vercel.app)
      const isVercelPreview = origin && /^https:\/\/wobblix-[a-z0-9-]+\.vercel\.app$/.test(origin)

      if (!origin || allowedOrigins.includes(origin) || isVercelPreview) {
        callback(null, true)
      } else {
        callback(new Error(`CORS: Origin ${origin} not allowed`))
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true
  })
)

// ---------------- API ROUTES ----------------
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// ─── HEALTH CHECK (Production-Grade for Uptime Bots) ───────────────────────
app.get('/health', async (req, res) => {
  const dbState = mongoose.connection.readyState
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const dbStatus = dbState === 1 ? 'connected' : 'disconnected'
  const isHealthy = dbState === 1

  const healthReport = {
    status: isHealthy ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
    environment: process.env.NODE_ENV || 'development',
    services: {
      server: 'ok',
      database: dbStatus,
    }
  }

  return res
    .status(isHealthy ? 200 : 503)
    .json(healthReport)
})

app.get('/favicon.ico', (req, res) => res.status(204).end())
app.get('/', (req, res) => res.send('Wobblix API is Running 🚀'))

// ---------------- GLOBAL ERROR HANDLER ----------------
app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err.stack)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  })
})

// ---------------- START SERVER ----------------
app.listen(port, () => {
  console.log('Server started on PORT : ' + port)
})



