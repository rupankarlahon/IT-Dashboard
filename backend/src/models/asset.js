const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Asset = sequelize.define('Asset', {
    assetId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    assetClass: {
        type: DataTypes.STRING,
        allowNull: false
    },
    assetNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    inventoryNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    makeModel: {
        type: DataTypes.STRING,
        allowNull: false
    },
    serialNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    assetDescription: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    availability: {
        type: DataTypes.ENUM('Available', 'In Use', 'Under Maintenance', 'Retired'),
        allowNull: false,
        defaultValue: 'Available'
    }
});

module.exports = Asset;