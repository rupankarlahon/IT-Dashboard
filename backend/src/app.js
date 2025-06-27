const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const assetRoutes = require('./routes/assets');
const contractRoutes = require('./routes/contracts');

const app = express();
const BASE_PORT = 5000;
const MAX_PORT_ATTEMPTS = 10;


app.use(cors());
app.use(express.json());


app.use('/assets', assetRoutes);
app.use('/contracts', contractRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: err.message 
    });
});


const tryPort = (port) => {
    return new Promise((resolve, reject) => {
        const server = app.listen(port)
            .on('listening', () => {
                console.log(`Server running on port ${port}`);
                resolve(server);
            })
            .on('error', (err) => {
                if (err.code === 'EADDRINUSE') {
                    console.log(`Port ${port} is busy`);
                    server.close();
                    resolve(false);
                } else {
                    reject(err);
                }
            });
    });
};


const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        
        await sequelize.sync({ alter: true });
        console.log('Database models synchronized.');

    
        for (let port = BASE_PORT; port < BASE_PORT + MAX_PORT_ATTEMPTS; port++) {
            const server = await tryPort(port);
            if (server) {
                
                process.on('SIGTERM', () => {
                    console.info('SIGTERM signal received. Closing HTTP server');
                    server.close(() => {
                        console.log('HTTP server closed');
                        process.exit(0);
                    });
                });
                break;
            }
            if (port === BASE_PORT + MAX_PORT_ATTEMPTS - 1) {
                throw new Error('No available ports found');
            }
        }
    } catch (error) {
        console.error('Unable to start server:', error);
        process.exit(1);
    }
};

startServer();