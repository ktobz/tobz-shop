require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Authenticate database connection
    await sequelize.authenticate();
    console.log('✅  Database connection established successfully.');

    // Sync models (in development — use migrations in production)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('✅  Sequelize models synced.');
    }

    app.listen(PORT, () => {
      console.log('');
      console.log('┌─────────────────────────────────────────────┐');
      console.log(`│  🚀  Server running on port ${PORT}             │`);
      console.log(`│  📦  ENV: ${(process.env.NODE_ENV || 'development').padEnd(34)}│`);
      console.log(`│  🌐  http://localhost:${PORT}                  │`);
      console.log('└─────────────────────────────────────────────┘');
      console.log('');
      console.log('  API Endpoints:');
      console.log(`  → POST   http://localhost:${PORT}/api/auth/register`);
      console.log(`  → POST   http://localhost:${PORT}/api/auth/login`);
      console.log(`  → GET    http://localhost:${PORT}/api/auth/profile`);
      console.log(`  → GET    http://localhost:${PORT}/api/products`);
      console.log(`  → POST   http://localhost:${PORT}/api/products`);
      console.log(`  → GET    http://localhost:${PORT}/api/products/:id`);
      console.log(`  → PUT    http://localhost:${PORT}/api/products/:id`);
      console.log(`  → DELETE http://localhost:${PORT}/api/products/:id`);
      console.log('');
    });
  } catch (error) {
    console.error('❌  Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
