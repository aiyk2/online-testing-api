const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateQuestionInput(data) {
  let errors = {};

  data.question = !isEmpty(data.question) ? data.question : '';
  data.answer = !isEmpty(data.answer) ? data.answer : '';
  data.duration = !isEmpty(data.duration) ? data.duration : '';

  if (!Validator.isLength(data.question, { min: 5})) {
    errors.question = 'Test question must be between 3 and 255 characters';
  }

  if (Validator.isEmpty(data.question)) {
    errors.question = 'Question field is required';
  }

  if (Validator.isEmpty(data.answer)) {
    errors.answer = 'The answer field is required';
  }

  if (!Validator.isLength(data.answer, { min: 1, max: 5 })) {
    errors.answer = 'The answer field must be between 1 and 5 characters';
  }

  if (Validator.isEmpty(data.duration)) {
    errors.duration = 'The duration field is required';
  }

  if (!Validator.isLength(data.duration, { min: 10 })) {
    errors.duration = 'The duration field must have a minimum of 10 characters';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
