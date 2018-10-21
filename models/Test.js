const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// remember to make an endpoint for duration. this will be computed based on time aloted per question
// Create Schema
const TestSchema = new Schema({
  title: {
    // test title
    type: String,
    required: true,
    maxlength: 255,
    minlength: 3
  },
  qstsPerTest: {
    //number of questions per test
    type: Number,
    required: true,
    min: 1,
    max: 500
  },
  questions: [
    {
      question: {
        type: String,
        reqired: true,
        minlength: 5,
        maxlength: 1000
      },
      options: {
        type: [String],
        minlength: 1,
        maxlength: 1000
      }, //an array of options (key value pair)
      answer: {
        // if selected choice (option key + 1) == answer(number) then score++
        type: Number,
        min: 1,
        max: 5,
        required: true
      },
      duration: {
        // timer per question in seconds
        type: Number,
        min: 10,
        default: 30,
        min: 1
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
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
