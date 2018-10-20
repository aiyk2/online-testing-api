const Joi = require('joi');

module.exports = function validateLoginInput(data) {
  const schema = {
    email: Joi.string().required().min(3).max(255),
    password: Joi.string().required()
  };

  return result = Joi.validate(data, schema);
};
