const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session'); // Import express-session
const Cart = require('./models/cart'); // Import the Cart model
const Contact = require('./models/contact'); // Import the Contact model

const app = express();
const PORT = 3001;

// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../Frontend')));

// Configure session middleware
app.use(
  session({
    secret: 'your-secret-key', // Replace with a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set `secure: true` if using HTTPS
  })
);

// Serve frontend files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});

app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/products.html'));
});

// Serve the About page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/about.html'));
});

// Serve the Contact page
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/contact.html'));
});

// Serve the Contact page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/login.html'));
});



// API to save cart data (only if logged in)
app.post('/api/cart', async (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.status(401).json({ error: 'Unauthorized. Please log in first.' });
  }

  try {
    const { items, totalQuantity, totalPrice } = req.body;

    // Create a new cart entry
    const newCart = new Cart({
      items,
      totalQuantity,
      totalPrice,
    });

    // Save the cart to MongoDB
    await newCart.save();
    res.status(201).json({ message: 'Cart data saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save cart data' });
  }
});

// API to save contact form data
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate the input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new contact entry
    const newContact = new Contact({
      name,
      email,
      message,
    });

    // Save the contact data to MongoDB
    await newContact.save();
    res.status(201).json({ message: 'Contact data saved successfully!' });
  } catch (error) {
    console.error('Error saving contact data:', error);
    res.status(500).json({ error: 'Failed to save contact data' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});