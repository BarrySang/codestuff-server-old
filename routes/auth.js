const express = require('express');
const router =  express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Signup
router.post('/signup', (req, res) => {
    const { first_name, other_name, username, email, password, passwordconfirm } = req.body;

    //errors array
    let errors = [];

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

    if(errors.length > 0) {
        res.status(400).json({errors: errors});
    } else {
        let hashed_password = '';
        //Hash password
        
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
                res.status(400).json({error: 'email already in use'});
            });
        }));
        

        
    }

});

module.exports = router;