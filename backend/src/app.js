require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const app = express();

const assetRoutes = require('./routes/assets');
const contractRoutes = require('./routes/contracts');
const serviceRoutes = require('./routes/services');
const authRoutes = require('./routes/authRoutes');

const BASE_PORT = 5000;
const MAX_PORT_ATTEMPTS = 10;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/assets', assetRoutes);
app.use('/contracts', contractRoutes);
app.use('/services', serviceRoutes);
app.use('/auth', authRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message,
  });
});

// Dynamic Port Retry Logic
const tryPort = (port) => {
  return new Promise((resolve, reject) => {
    const server = app
      .listen(port)
      .on('listening', () => {
        console.log(`✅ Server running on http://localhost:${port}`);
        resolve(server);
      })
      .on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.log(`⚠️  Port ${port} is already in use.`);
          resolve(false);
        } else {
          reject(err);
        }
      });
  });
};

// Server Bootstrapping
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established.');

    await sequelize.sync({ alter: true }); // alter: true is okay for dev
    console.log('✅ Models synchronized.');

    for (let port = BASE_PORT; port < BASE_PORT + MAX_PORT_ATTEMPTS; port++) {
      const server = await tryPort(port);
      if (server) {
        process.on('SIGTERM', () => {
          console.info('SIGTERM signal received. Shutting down...');
          server.close(() => {
            console.log('HTTP server closed');
            process.exit(0);
          });
        });
        break;
      }
      if (port === BASE_PORT + MAX_PORT_ATTEMPTS - 1) {
        throw new Error('❌ No available ports found');
      }
    }
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
};

startServer();