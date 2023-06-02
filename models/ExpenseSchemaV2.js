const mongoose = require('mongoose');

const ExpenseV2Schema = mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  purchase: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  purchasedFor: {
    type: String,
    required: true
  },
  paymentMode: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('ExpensesV2', ExpenseV2Schema);
