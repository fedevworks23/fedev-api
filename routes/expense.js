const express = require('express');
const router = express.Router();
const Expense = require('../models/ExpenseSchema');
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  // res.send('We are on expenses');
  try {
    const getAllExpenses = await Expense.find().exec();
    // console.log(getAllExpenses);
    res.send({ status: 200, data: getAllExpenses });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.post('/', [
  check('expenseItem').notEmpty().withMessage('Item Name is required'),
  check('expensePrice', 'Price is required').notEmpty(),
  check('expenseType', 'expenseType is required').notEmpty(),
  check('description', 'Description is required').optional(),
  check('paymentMode', 'Payment Mode is required').notEmpty(),
  check('expenseDate', 'Expense Date is required').notEmpty(),
], async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(300).json({ errors: errors.mapped() })
    } else {
      const expense = new Expense({ ...req.body });
      await expense.save();
      return res.status(200).json('Expense Saved Successful...!!!');
    }
  } catch (error) {
    response.status(500).json({ message: error });
  }
});

router.get('/:expenseId', async (req, res) => {
  try {
    const getByExpenseId = await Expense.findById(req.params.expenseId);
    // console.log(getByExpenseId);
    res.json(getByExpenseId);
  } catch (error) {
    res.status(500).json({ message: error });
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

router.put('/:expenseId', async (req, res) => {
  try {
    const findByExpenseId = await Expense.findById(req.params.expenseId);
    findByExpenseId.set(req.body);
    const result = await findByExpenseId.save();
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;