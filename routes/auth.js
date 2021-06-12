const express = require('express');
const router =  express.Router();

// Signup
router.post('/signup', (req, res) => {
    const { firstname, othername, username, email, password, passwordconfirm } = req.body;

    //errors array
    let errors = [];

    //check required fields
    if(!firstname || !othername || !email  || !username || !password || !passwordconfirm ) {
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
        res.status(200).json({success: success});
    }

});

module.exports = router;