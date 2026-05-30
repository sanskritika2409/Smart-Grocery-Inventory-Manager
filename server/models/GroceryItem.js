const mongoose = require('mongoose');

const grocerySchema = new mongoose.Schema({
  itemName: String,
  category: String,
  quantity: Number,
  unit: String,
  minimumStock: Number,
  expiryDate: Date,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('GroceryItem', grocerySchema);