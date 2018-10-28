const express = require("express");
const router = express.Router();
// const mongoose = require('mongoose');
const passport = require("passport");

// Load Validation
const validateQuestionInput = require("../../validation/question");

// Load Test Model
const Test = require("../../models/Test");

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

        if(req.body.question_id){//where question_id = array index for the specified question
          // const qst = test.questions.question.id(req.body.question_id);
          question_id = req.body.question_id;
          test.questions[question_id].createdBy = req.user.id;
          test.questions[question_id].question = req.body.question;
          test.questions[question_id].options = req.body.options;
          test.questions[question_id].answer = req.body.answer;
          test.questions[question_id].duration = req.body.duration;
          
          test.save()
            .then(test => res.json(test))
            .catch(err =>
              res.status(500).json(err)
            );
        } else{

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
        }
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

// @route   POST api/test/question/id/:_id
// @desc    get test question by id
// @access  Private
router.post(
  "/id/:_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    Test.findOne({ _id: req.body.test_id }).then(test => {
      if (test) {
        const qst = test.questions.id(req.body.question_id);
        res.json(qst);
      } else {
        return res.status(404).json("Test was not found");
      }
    });
  }
);

// @route   POST api/test/question/count
// @desc    return the number of questions in test
// @access  Private
router.post(
  "/count",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    //find test and return the total number of questions in the test
    Test.findOne({ _id: req.body.test_id }).then(test => {
      if (test) {
        res.json(test.questions.length)
      } else {
        return res.status(404).json("Test was not found");
      }
    });
  }
);

// @route   POST api/test/question/all
// @desc    return test questions
// @access  Private
router.post(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    //find test and return its questions
    Test.findOne({ _id: req.body.test_id }).then(test => {
      if (test) {
        res.json(test.questions)
      } else {
        return res.status(404).json("Test was not found");
      }
    });
  }
);

module.exports = router;
