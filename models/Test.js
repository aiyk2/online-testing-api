const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { QuestionSchema } = require('./Question');


// remember to make an endpoint for duration. this will be computed based on time aloted per question
// Create Schema
const TestSchema = new Schema({
  title: {
    // test title
    type: String,
    required: true,
    trim: true,
    maxlength: 255,
    minlength: 3
  },
  qstsPerTest: {
    //number of questions per test
    type: Number,
    required: true,
    trim: true,
    min: 1,
    max: 500
  },
  questions: {
    type: Array,
    question: QuestionSchema
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Test = mongoose.model("test", TestSchema);