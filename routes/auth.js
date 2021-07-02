const express = require('express');
const router =  express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Signup
router.post('/signup', (req, res) => {
    const { first_name, other_name, username, email, password, passwordconfirm } = req.body;

    //errors array
    let errors = [];

    //function to check if email already exists
    async function getUsedEmail() {
        let usedEmail = await User.findOne({where: {email: email}});
        return usedEmail;
    }

    //check required fields
    if(!first_name || !other_name || !email  || !username || !password || !passwordconfirm ) {
        errors.push({ msg: 'Ensure all fields are filled'});
    }

    // check password confirmation
    if(password !== passwordconfirm) {
        errors.push({ msg: 'Passwords do not match' });
    }

    // check password length
    if(password.length < 6) {
        errors.push({ msg: 'Password should be at least six(6) characters' });
    }

    //return errors to client
    if(errors.length > 0) {
        res.status(400).json({errors: errors});
    } else {
    // initialize hashed_password variable
    let hashed_password = '';

    getUsedEmail().then(data => {
        if(data !== null) {
            res.status(400).json('email already in use');
        } else {
            if(data === null) {
                //Hash password and register user
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(password, salt, (err, hash) => {
                    if(err) throw err;
                    hashed_password = hash;

                    User.create({
                        first_name,
                        other_name,
                        email,
                        username,
                        hashed_password
                    })
                    .then(user => {
                        res.status(200).json({success: 'registration succesful'});
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).json({error: 'an error occured'});
                    });
                }));
            }
        }
    }).catch(err => console.log(err));

    
    }
});

module.exports = router;