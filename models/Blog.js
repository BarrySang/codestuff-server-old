const Sequelize = require('sequelize');
const db = require('../config/database');

const Blog = db.define('blog', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,        
    },
    preamble: {
        type: Sequelize.STRING,        
    },
    body: {
        type: Sequelize.TEXT
    }
});

module.exports = Blog;