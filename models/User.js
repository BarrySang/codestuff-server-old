const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    first_name: {
        type: Sequelize.STRING
    },
    other_name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    username: {
        type: Sequelize.STRING,
        unique: true
    },
    hashed_password: {
        type: Sequelize.STRING
    }
});

module.exports = User;