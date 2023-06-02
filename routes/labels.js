const express = require('express');
const router = express.Router();
const Label = require('../models/LabelsSchema');
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  // res.send('We are on Cards');
  try {
    const getAllLabels = await Label.find().exec();
    // console.log(getAllLabels);
    res.send({status: 200, data: getAllLabels});
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.post('/', [
  check('cardNo').notEmpty().withMessage('cardNo is required'),
  check('expenseType', 'month is required').notEmpty(),
  check('labelDate', 'labelDate is required').optional(),
], async (req, res) => {
  console.log(req.body);
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(300).json({ errors: errors.mapped() })
    } else {
      const expense = new Label({ ...req.body });
      await expense.save();
      return res.status(200).json('Expense Saved Successful...!!!');
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete('/:LabelId', async (req, res) => {
  try {
    console.log(req);
    // const deleteByLabelId = await Label.deleteOne({ _id: req.params.LabelId });
    // console.log(deleteByLabelId);
    return res.status(200).json('Expense Deleted Successful...!!!');
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;