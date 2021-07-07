//variables
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const db = require('./config/database');
const passport = require('passport');
const session = require('express-session'); 
 
//passport config
require('./config/passport')(passport);

app.use(express.json());

// Body Parser
app.use(express.urlencoded({ extended: false }));

//set up express session
const sess = {
    secret: 'a secret',
    resave: true,
    saveUninitialized: true,
    cookie: {}
}

if(app.get('env') === 'production') {
    app.set('trust proxy', 1);
    sess.cookie.secure = true
}

app.use(session(sess));

//passport middleware 
app.use(passport.initialize());
app.use(passport.session());

//Confirm database connection
db.authenticate()
    .then(() => console.log('connected to database'))
    .catch((err) => console.log(err));

// routes
app.use('/blogs', require('./routes/blogs'));
app.use('/auth', require('./routes/auth'));

//Function for listening to a port
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});