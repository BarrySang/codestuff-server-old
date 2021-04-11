const Sequelize = require('sequelize');

module.exports = new Sequelize('codestuff', 'root', 's3ntinel', {
    host: 'localhost',
    dialect: 'mysql'
});