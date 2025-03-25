let cart = []; // Array to store cart items

// Function to add items to the cart
function addToCart(productName, productPrice) {
  const existingProduct = cart.find((item) => item.name === productName);

  if (existingProduct) {
    existingProduct.quantity += 1;
    existingProduct.totalPrice += productPrice;
  } else {
    cart.push({
      name: productName,
      price: productPrice,
      quantity: 1,
      totalPrice: productPrice,
    });
  }

  updateCartUI();
}

// Function to update the cart UI
function updateCartUI() {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalQuantityElement = document.getElementById('total-quantity');
  const totalPriceElement = document.getElementById('total-price');

  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>No items in the cart.</p>';
  } else {
    cart.forEach((item) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <p>${item.name} - $${item.price} x ${item.quantity} = $${item.totalPrice.toFixed(2)}</p>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
  }

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  totalQuantityElement.textContent = totalQuantity;
  totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Function to handle payment
async function handlePayment() {
  try {
    // Check login status
    const loginResponse = await fetch('/api/check-login');
    const loginData = await loginResponse.json();

    if (!loginData.isLoggedIn) {
      alert('You must log in to proceed with payment.');
      return;
    }

    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);

    const cartData = {
      items: cart,
      totalQuantity,
      totalPrice,
    };

    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartData),
    });

    if (response.ok) {
      alert('Payment successful! Cart data saved.');
      cart = []; // Clear the cart
      updateCartUI(); // Update the UI
    } else {
      alert('Failed to save cart data.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while processing your payment.');
  }
}

// Attach the payment handler to the payment button
document.getElementById('payment').addEventListener('click', handlePayment);