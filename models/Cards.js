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
  expenseDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Cards', ExpenseSchema);
