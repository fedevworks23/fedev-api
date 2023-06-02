const express = require('express');
const router = express.Router();
const ExpenseV2 = require('../models/ExpenseSchemaV2');
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  // res.send('We are on expenses');
  try {
    // const excludeMeta = await ExpenseV2.find({}, { meta: 0 });
    const getExpense = await ExpenseV2.find();
    // console.log(getAllExpenses);
    res.send({ status: 200, data: getExpense });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.post('/', [
  check('year').notEmpty().withMessage('year is required'),
  check('month', 'month is required').notEmpty(),
  check('purchase', 'purchase is required').notEmpty(),
  check('amount', 'amount is required').notEmpty(),
  check('purchasedFor', 'purchasedFor is required').notEmpty(),
  check('paymentMode', 'paymentMode is required').notEmpty(),
  check('description', 'description is required').optional()
], async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(300).json({ errors: errors.mapped() });
    } else {
      const expense = new ExpenseV2({ ...req.body });
      await expense.save();
      return res.status(200).json('Expense Saved Successful...!!!');
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get('/:expenseId', async (req, res) => {
  try {
    const getByExpenseId = await ExpenseV2.findById(req.params.expenseId);
    // console.log(getByExpenseId);
    res.json(getByExpenseId);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete('/:expenseId', async (req, res) => {
  try {
    await ExpenseV2.deleteOne({ _id: req.params.expenseId });
    return res.status(200).json('Expense Deleted Successful...!!!');
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.put('/:expenseId', async (req, res) => {
  try {
    const findByExpenseId = await ExpenseV2.findById(req.params.expenseId);
    findByExpenseId.set(req.body);
    await findByExpenseId.save();
    return res.status(200).json('Expense Updated Successful...!!!');
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;