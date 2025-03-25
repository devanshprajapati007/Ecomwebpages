# Ecomwebpages
EcommWebpage - ShopEasy
An interactive, full-stack e-commerce website with essential features like product display, cart functionality, payment processing, and user authentication.

Features
Product Display: View products with images, prices, and descriptions.

Add to Cart: Add multiple products to the cart, with quantity and price dynamically updated.

Cart Summary: View total items, total quantity, and total price in the cart.

Payment Handling: Payment process accessible only to logged-in users.

MongoDB Database Integration: Save cart and user contact data in MongoDB.

Responsive Design: Fully responsive layout for both desktop and mobile.

Backend APIs: RESTful APIs to handle cart data, user login sessions, and contact form submissions.

Project Structure:-

ecommwebpage/
│
├── Frontend/
│   ├── index.html          # Homepage
│   ├── products.html       # Products page
│   ├── about.html          # About page
│   ├── contact.html        # Contact page
│   ├── login.html          # Login page
│   ├── styles/
│   │   └── product.css     # CSS for products page
│   └── scripts/
│       └── cart.js         # JavaScript for cart functionality
│
├── Backend/
│   ├── models/
│   │   ├── cart.js         # Cart model schema for MongoDB
│   │   └── contact.js      # Contact form model schema
│   └── server.js           # Express server setup and routes
│
├── package.json            # Node.js dependencies
└── README.md               # Project documentation (this file)
