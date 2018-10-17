const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TestScheduleSchema = new Schema({
  candidate: { // test candidate
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  test: { //course to take a test for
    type: Schema.Types.ObjectId,
    ref: 'tests',
    required: true
  },
  start: {
    type: Date
  },
  status: {
      type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Test = mongoose.model('test', TestScheduleSchema);
