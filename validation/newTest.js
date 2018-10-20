// const Validator = require('validator');
// const isEmpty = require('./is-empty');

// module.exports = function validateNewTestInput(data) {
//   let errors = {};

//   data.title = !isEmpty(data.title) ? data.title : '';
//   data.qstsPerTest = !isEmpty(data.qstsPerTest) ? data.qstsPerTest : '';

//   if (!Validator.isLength(data.title, { min: 3, max: 255 })) {
//     errors.title = 'Test Title must be between 3 and 255 characters';
//   }

//   if (Validator.isEmpty(data.title)) {
//     errors.title = 'Title field is required';
//   }

//   if (Validator.isEmpty(data.qstsPerTest)) {
//     errors.qstsPerTest = 'The number of questions field is required';
//   }

//   if (!Validator.isLength(data.qstsPerTest, { min: 1, max: 500 })) {
//     errors.qstsPerTest = 'The number of questions field must be between 1 and 500';
//   }
//   return {
//     errors,
//     isValid: isEmpty(errors)
//   };
// };
