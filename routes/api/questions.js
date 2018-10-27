const express = require("express");
const router = express.Router();
// const mongoose = require('mongoose');
const passport = require("passport");

// Load Validation
const validateQuestionInput = require("../../validation/question");

// Load Test Model
const Test = require("../../models/Test");

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
router.get("/test", (req, res) => res.json({ msg: "Question Works" }));

// @route   POST api/test/question
// @desc    Create or edit Test question
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const validate = validateQuestionInput(req.body);

    // Check Validation
    if (validate.error) {
      // Return any errors with 400 status
      return res.status(400).json(validate.error);
    }

    //find test to add question to
    Test.findOne({ _id: req.body.test_id }).then(test => {
      if (test) {
        const questionFields = {};
        questionFields.createdBy = req.user.id;
        questionFields.test_id = req.body.test_id;
        questionFields.question = req.body.question;
        questionFields.options = req.body.options;
        questionFields.answer = req.body.answer;
        questionFields.duration = req.body.duration;

        test.questions.push(questionFields);
        test.save()
          .then(test => res.json(test))
          .catch(err =>
            res.status(500).json("saving question failed")
          );
      } else {
        return res.status(404).json("Test was not found");
      }
    });
  }
);

// @route   POST api/test/question/delete
// @desc    Delete Test question
// @access  Private
router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    //find test and delte its question
    Test.findOne({ _id: req.body.test_id }).then(test => {
      if (test) {
        const qst = test.questions.id(req.body.question_id);
        qst.remove();
        test.save()
          .then(test => res.json(test))
          .catch(err =>
            res.status(500).json("Deletion failed")
          );
      } else {
        return res.status(404).json("Test was not found");
      }
    });
  }
);

// @route   GET api/test/all
// @desc    Get all tests
// @access  Public
router.get("/all", (req, res) => {
  Test.find()
    .then(tests => {
      if (!tests) {
        return res.status(404).json("There are no tests");
      }

      res.json(tests);
    })
    .catch(err => res.status(404).json("There are no tests"));
});

// @route   GET api/test/count
// @desc    Get the total number of tests
// @access  Public
router.get("/count", (req, res) => {
  Test.find()
    .count()
    .then(count => {
      if (!count) {
        return res.status(404).json("There are no tests");
      }

      res.json(count);
    })
    .catch(err => res.status(404).json("There are no tests"));
});

// @route   GET api/test/id/:id
// @desc    Get test by id
// @access  Public

router.get("/id/:_id", (req, res) => {
  Test.findOne({ _id: req.params._id })
    .then(test => {
      if (!test) {
        res.status(404).json("The specified test was not found");
      }

      res.json(test);
    })
    .catch(err => res.status(404).json("The specified test was not found"));
});

// @route   GET api/test/user/:user_id
// @desc    Get tests by user ID
// @access  Public

router.get("/user/:user_id", (req, res) => {
  Test.find({ createdBy: req.params.user_id })
    .then(test => {
      if (!test) {
        res.status(404).json("There is no test for this user");
      }

      res.json(test);
    })
    .catch(err => res.status(404).json("There is no test for this user"));
});

// @route   DELETE api/Test
// @desc    Delete Test
// @access  Private
router.delete(
  "/id/:_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Test.findOneAndRemove({ _id: req.params._id })
      .then(() => res.json({ success: true }))
      .catch(err => res.status(404).json("Could not delete test"));
  }
);

module.exports = router;
