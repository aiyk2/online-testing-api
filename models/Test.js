const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TestSchema = new Schema({
  title: {
    type: String,
    required: true,
    max: 40,
    min: 3
  },
  qstPerTest: {
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
        min: 5
      },
      options: [String],
      answer: {
        type: Number,
        min: 1,
        max: 5
      },
      duration: {
        type: Number,
        required: true,
        max: 20000,
        min: 0
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      dateCreated: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  course: {
    type: String,
    required: true,
    max: 40
  },
  githubusername: {
    type: String
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Test = mongoose.model('test', TestSchema);
