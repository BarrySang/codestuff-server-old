//variables
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const db = require('./config/database');

app.use(express.json());

app.use('/blogs', require('./routes/blogs'));
app.use('/auth', require('./routes/auth'));

//Confirm database connection
db.authenticate()
    .then(() => console.log('connected to database'))
    .catch((err) => console.log(err));


//Function for listening to a port
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});