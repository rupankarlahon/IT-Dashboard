const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Service = sequelize.define('Service', {
    serviceID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    serviceName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    engineerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    entry: {
        type: DataTypes.DATE,
        allowNull: false
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Service;