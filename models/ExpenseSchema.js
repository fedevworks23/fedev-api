const mongoose = require('mongoose');

const ExpenseSchema = mongoose.Schema({
  expenseItem: {
    type: String,
    required: true
  },
  expensePrice: {
    type: Number,
    required: true
  },
  expenseType: {
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
  expenseDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Expenses', ExpenseSchema);
