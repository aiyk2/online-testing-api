const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateNewTestInput = require('../../validation/newTest');

// Load Test Model
const Test = require('../../models/Test');
// Load User Model
const User = require('../../models/User');

/*

POST Question
GET Test Questions
GET Question
EDIT Question
DELETE Question

*/

// @route   GET api/test/test
// @desc    Tests test route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Test Works' }));

// @route   POST api/test
// @desc    Create or edit user Test
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateNewTestInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const testFields = {};
    testFields.createdBy = req.user.id;
    testFields.title = req.body.title;
    testFields.qstsPerTest = req.body.qstsPerTest;

    // to update a test, send along the test id with the request
    Test.findOne({ _id: req.body.id }).then(test => { 
      if (test) {
        // Update
        Test.findOneAndUpdate(
          { createdBy: req.user.id },
          { $set: testFields },
          { new: true }
        ).then(test => res.json(test));
      } else {
        // Create

        new Test(testFields).save().then(test => res.json(test));
      }
    });
  }
);

// @route   GET api/test/all
// @desc    Get all tests
// @access  Public
router.get('/all', (req, res) => {
    const errors = {};
  
    Test.find()
    //   .populate('user', ['name', 'avatar'])
      .then(tests => {
        if (!tests) {
          errors.notest = 'There are no tests';
          return res.status(404).json(errors);
        }
  
        res.json(tests);
      })
      .catch(err => res.status(404).json({ test: 'There are no tests' }));
});

// @route   GET api/test/count
// @desc    Get the total number of tests
// @access  Public
router.get('/count', (req, res) => {
    const errors = {};
  
    Test.find().count()
      .then(count => {
        if (!count) {
          errors.notest = 'There are no tests';
          return res.status(404).json(errors);
        }
  
        res.json(count);
      })
      .catch(err => res.status(404).json({ test: 'There are no tests' }));
});

// @route   GET api/test/id/:id
// @desc    Get test by id
// @access  Public

router.get('/id/:_id', (req, res) => {
    const errors = {};
  
    Test.findOne({ _id: req.params._id })
      .then(test => {
        if (!test) {
          errors.notest = 'The specified test was not found';
          res.status(404).json(errors);
        }
  
        res.json(test);
      })
      .catch(err => res.status(404).json(err));
});

// @route   GET api/test/user/:user_id
// @desc    Get tests by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
    const errors = {};
  
    Test.find({ createdBy: req.params.user_id })
      .then(test => {
        if (!test) {
          errors.notest = 'There is no test for this user';
          res.status(404).json(errors);
        }
  
        res.json(test);
      })
      .catch(err =>
        res.status(404).json({ test: 'There is no test for this user' })
      );
});

// @route   DELETE api/Test
// @desc    Delete Test
// @access  Private
router.delete(
  '/id/:_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Test.findOneAndRemove({ _id: req.params._id })
        .then(() => res.json({ success: true }));
  }
);

module.exports = router;
