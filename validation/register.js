const Joi = require('joi');

module.exports = function validateRegisterInput(data) {
  const schema = {
    firstname: Joi.string().required().min(3).max(255),
    lastname: Joi.string().required().min(3).max(255),
    email: Joi.string().required().min(3).max(255),
    password: Joi.string().required(),
    password2: Joi.string().required(),
    avatar: Joi.string()
  };

  return result = Joi.validate(data, schema);
};
