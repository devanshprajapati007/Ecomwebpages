document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the default form submission

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  const contactData = { name, email, message };

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    if (response.ok) {
      alert('Your message has been sent successfully!');
      document.getElementById('contact-form').reset(); // Clear the form
    } else {
      alert('Failed to send your message. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while sending your message.');
  }
});