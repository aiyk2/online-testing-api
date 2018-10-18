const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateQuestionInput = require('../../validation/question');

// Load Test Model
const Test = require('../../models/Test');

/*

POST Question
GET Test Questions
GET Question
EDIT Question
DELETE Question

*/

// @route   GET api/question/test
// @desc    Tests question route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Question Works' }));


module.exports = router;
