const mongoose = require('mongoose');

// Define the hotel menu schema
const menuSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'],
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
});

// Create the Menu model
const Menu = mongoose.model('Menu', menuSchema);
//yp

module.exports = Menu;
