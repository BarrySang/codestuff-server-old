const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = function(passport) {
    
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            User.findOne({where: {email: email}})
                .then(user => {
                    //Match email
                    if(!user) {
                        return done(null, false, {error: 'no user with the given email'});
                    }

                    //Match password
                    bcrypt.compare(password, user.hashed_password, (err, isMatch) => {
                        if (err) throw err;
                        if(!isMatch) {
                            return done(null, false, {error: 'password incorrect'});
                        } else {
                            return done(null, user);
                        }
                    })
                })
                .catch(err => console.log(err));
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findByPk(id, function(err, user) {
          done(err, user);
        });
      });
}