const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateNewTestInput = require('../../validation/newTest');

// Load Test Model
const Test = require('../../models/Test');

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
    const validate = validateNewTestInput(req.body);

    // Check Validation
    if (validate.error) {
      // Return any errors with 400 status
      return res.status(400).json(validate.error);
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
  
    Test.find()
      .then(tests => {
        if (!tests) {
          return res.status(404).json('There are no tests');
        }
  
        res.json(tests);
      })
      .catch(err => res.status(404).json('There are no tests' ));
});

// @route   GET api/test/count
// @desc    Get the total number of tests
// @access  Public
router.get('/count', (req, res) => {
  
    Test.find().count()
      .then(count => {
        if (!count) {
          return res.status(404).json('There are no tests');
        }
  
        res.json(count);
      })
      .catch(err => res.status(404).json('There are no tests' ));
});

// @route   GET api/test/id/:id
// @desc    Get test by id
// @access  Public

router.get('/id/:_id', (req, res) => {
  
    Test.findOne({ _id: req.params._id })
      .then(test => {
        if (!test) {
          res.status(404).json('The specified test was not found');
        }
  
        res.json(test);
      })
      .catch(err => res.status(404).json('The specified test was not found'));
});

// @route   GET api/test/user/:user_id
// @desc    Get tests by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
  
    Test.find({ createdBy: req.params.user_id })
      .then(test => {
        if (!test) {
          res.status(404).json('There is no test for this user');
        }
  
        res.json(test);
      })
      .catch(err =>
        res.status(404).json('There is no test for this user' )
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
        .then(() => res.json({ success: true }))
        .catch(err =>
          res.status(404).json('Could not delete test' )
        );;
  }
);

module.exports = router;
