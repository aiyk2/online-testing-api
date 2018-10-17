const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTestScheduleInput(data) {
  let errors = {};
 
  data.candidate = !isEmpty(data.candidate) ? data.candidate : '';
  data.test = !isEmpty(data.test) ? data.test : '';
  data.duration = !isEmpty(data.duration) ? data.duration : '';

  if (Validator.isEmpty(data.candidate)) {
    errors.candidate = 'candidate field is required';
  }

  if (Validator.isEmpty(data.test)) {
    errors.test = 'The test field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
