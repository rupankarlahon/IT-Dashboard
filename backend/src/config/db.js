// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('itmanagementportal_db', 'root', 'Riki@0376', {
//     host: 'localhost',
//     dialect: 'mysql'
// });

// module.exports = sequelize;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('assets_db', 'root', 'vik7nike', {
    host: 'localhost',
    dialect: 'mysql'
});

// Test connection here
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL with Sequelize!');
  })
  .catch(err => {
    console.error('Connection failed:', err);
  });

module.exports = sequelize;