
const config = require('config');
const debug = require('debug')('app:debug');
const Joi = require('joi');
const morgan = require('morgan');
const helmet = require('helmet');

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const users = require('./routes/api/users');
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
    debug('Morgan enabled...');
}


//DB config 
const db = config.get('mongoURI');

//Connect to mongo db
mongoose
    .connect(db)
    .then(() => debug('MongoDB Connected'))
    .catch(err => debug(err));

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

// use routes
app.use('/api/users', users);
app.use('/api/test', test);
app.use('/api/question', question);

const port = process.env.PORT || 5000;

app.listen(port, () => debug(`Server running on port ${port}`));