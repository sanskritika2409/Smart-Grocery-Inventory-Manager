const router = require('express').Router();
const GroceryItem = require('../models/GroceryItem');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, async(req, res) => {
  try {
    const item = await GroceryItem.create({
      ...req.body,
      userId: req.user.id
    });

    res.json(item);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get('/', auth, async(req, res) => {
  try {
    const items = await GroceryItem.find({
      userId: req.user.id
    });

    res.json(items);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.put('/:id', auth, async(req, res) => {
  try {
    const item = await GroceryItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(item);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', auth, async(req, res) => {
  try {
    await GroceryItem.findByIdAndDelete(req.params.id);

    res.json({ message: 'Deleted' });
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;