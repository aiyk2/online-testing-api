const Joi = require('joi');

module.exports = function validateQuestionInput(data) {
    const schema = {
        question: Joi.string().required().min(5).max(1000),
        options: Joi.array().min(1).max(1000),
        answer: Joi.number().required().min(1).max(5),
        duration: Joi.number(),
        test_id: Joi.string().min(1).required()
    };

    return result = Joi.validate(data, schema);
};
