const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Contract = sequelize.define('Contract', {
    vendorName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gemContract: {
        type: DataTypes.STRING,
        allowNull: false
    },
    regularContract: {
        type: DataTypes.STRING,
        allowNull: false
    },
    period: {
        type: DataTypes.STRING,
        allowNull: false
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nomination: {
        type: DataTypes.STRING,
        allowNull: false
    },
    regular: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    oemOes: {
        type: DataTypes.STRING,
        allowNull: false
    },
    remarks: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Contract;