const express = require('express');
const router =  express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
//const passport = require('../config/passport');

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

    //function to check if username already exists
    async function getUsedUname() {
        let usedUname = await User.findOne({where: {username: username}});
        return usedUname;
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
            res.status(400).json({error: 'email already in use'});
        } else {
            getUsedUname().then(data => {
                if(data !== null) {
                    res.status(400).json({error: 'username already in use'});
                } else {
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
            }).catch(err => {
                console.log(err);
            });
        }
    }).catch(err => console.log(err));

    
    }
});

//login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            return res.status(401).json(err);
        } else if(!user) {
            return res.status(401).json(info);
        } else {
            req.logIn(user, function(err) {
                if (err) {
                    console.log(err);
                    return res.status(500).json('an error occured');
                }
                return res.status(200).json({success: 'login succesful'});
            })
        }
    })(req, res, next)
});


module.exports = router;