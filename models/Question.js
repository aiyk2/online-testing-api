const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question: {
      type: String,
      reqired: true,
      trim: true,
      minlength: 5,
      maxlength: 1000
    },
    options: {
      type: [String],
      trin: true,
      minlength: 1,
      maxlength: 1000
    }, //an array of options (key value pair)
    answer: {
      // if selected choice (option key + 1) == answer(number) then score++
      type: Number,
      min: 1,
      max: 5,
      required: true,
      trim: true
    },
    duration: {
      // timer per question in seconds
      type: Number,
      min: 10,
      default: 30,
      min: 1,
      trim: true
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

  const Question = mongoose.model("question", QuestionSchema);

  exports.Question = Question;
  exports.QuestionSchema = QuestionSchema;