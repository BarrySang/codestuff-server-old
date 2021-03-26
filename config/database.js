const Sequelize = require('sequelize');

module.exports = new Sequelize('codestuff', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});