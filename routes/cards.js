const express = require('express');
const router = express.Router();
const Expense = require('../models/Cards');

router.get('/', async (req, res) => {
  // res.send('We are on Cards');
  try {
    const getAllExpenses = await Expense.find().exec();
    // console.log(getAllExpenses);
    res.send({status: 200, data: getAllExpenses});
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.post('/', async (req, res) => {
  console.log(req.body);
  const expense = new Expense({
    expenseItem: req.body.expenseItem,
    expensePrice: req.body.expensePrice,
    expenseDate: req.body.expenseDate
  });

  try {
    const saveExpenseData = await expense.save();
    res.json(saveExpenseData);
  } catch (error) {
    response.status(500).json({ message: error });
  }
});

router.delete('/:expenseId', async (req, res) => {
  try {
    const deleteByExpenseId = await Expense.deleteOne({ _id: req.params.expenseId });
    res.json(deleteByExpenseId);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;