const Joi = require('joi');

module.exports = function validateNewTestInput(data) {
    const schema = {
        title: Joi.string().required().min(3).max(255),
        qstsPerTest: Joi.number().required().min(1).max(500),
        id: Joi.string().min(1)
      };
    
      return result = Joi.validate(data, schema);
}