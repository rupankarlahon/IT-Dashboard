const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  name: {
  type: DataTypes.STRING,
  allowNull: false
},
role: {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: 'user' // or 'admin'
},
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = User;
