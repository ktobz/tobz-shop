require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const oauthRoutes = require('./routes/oauthRoutes');
const socialLoginRoutes = require('./routes/socialLoginRoutes');

const app = express();

// ─── Core Middleware ─────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ─────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: '🚀 Node.js REST API — Sequelize ORM + JWT Auth',
    version: '1.0.0',
    auth: '✅ JWT Authentication',
    endpoints: {
      'GET  /':                      'Health check (this response)',
      'POST /api/auth/register':     '🌐 Register new user',
      'POST /api/auth/login':        '🌐 Login and get JWT token',
      'GET  /api/auth/profile':      '🔒 Get current user profile',
      'GET  /api/products':          '🌐 List products (paginated + search)',
      'GET  /api/products/:id':      '🌐 Get product by ID',
      'POST /api/products':          '🔒 Create product',
      'PUT  /api/products/:id':      '🔒 Update product (owner/admin)',
      'DELETE /api/products/:id':    '🔒 Delete product (owner/admin)'
    },
    timestamp: new Date().toISOString()
  });
});

// ─── API Routes ──────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/auth', oauthRoutes);
app.use('/api/auth', socialLoginRoutes);
app.use('/api/products', productRoutes);

// ─── 404 Handler ─────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.method} ${req.originalUrl} not found.`
  });
});

// ─── Global Error Handler ─────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message);

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed.',
      errors: err.errors.map((e) => e.message)
    });
  }

  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

module.exports = app;
