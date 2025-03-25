const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
    },
  ],
  totalQuantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

module.exports = mongoose.model('Cart', cartSchema);