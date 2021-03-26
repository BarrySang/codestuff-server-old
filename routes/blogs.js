//Ger dependancies
const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Blog = require('../models/Blog');

//Add a post
router.post('/add', (req, res) => {
    let {title, preamble, body} = req.body;

    if(!title || !body) {
        res.status(200).json({msg: 'all fields must be filled'});
    } else {
        Blog.create({
            title,
            preamble,
            body
        })
        .then(blog => {
            res.status(200).json({msg: 'blog added succesfully'});
        })
        .catch(err => {
            res.status(500).json({msg: 'internal server error'});
        })
    }
});

//Get all posts
router.get('/', (req, res) => {
    Blog.findAll()
    .then(blogs => {
        if(blogs.length === 0) {
            res.status(200).json({found: false});
        } else {
            res.status(200).send(blogs);
        }
    })
    .catch(err => {
        res.status(500).json({msg: 'internal server error'});
    });
});

module.exports = router;