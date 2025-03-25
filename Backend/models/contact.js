const mongoose = require('mongoose');

// Define the schema for the Contact model
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // Automatically store the creation date
});

// Create and export the Contact model
module.exports = mongoose.model('Contact', contactSchema);