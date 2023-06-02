const mongoose = require('mongoose');

const LabelsSchema = mongoose.Schema({
  cardNo: {
    type: Array,
    required: true
  },
  expenseType: {
    type: Array,
    required: true
  },
  labelDate: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Labels', LabelsSchema);
