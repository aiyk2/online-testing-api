
const config = require('config');
const Joi = require('joi');
const morgan = require('morgan');
const helmet = require('helmet');

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profiles');
const test = require('./routes/api/tests');
const question = require('./routes/api/questions');

const app = express();

//body parser middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.use(helmet());

//accessing App Configurations
// config.get('name');

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}


//DB config 
const db = config.get('mongoURI');

//Connect to mongo db
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

// use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/test', test);
app.use('/api/question', question);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));