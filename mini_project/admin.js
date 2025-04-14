document.getElementById('productForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Create an object to hold the product details from the form
  const product = {
    productName: document.getElementById('productName').value,
    productPrice: document.getElementById('productPrice').value,
    productImage: document.getElementById('productImage').value,
    productCategory: document.getElementById('productCategory').value,
  };

  try {
    // Send the new product data to the server via a POST request
    const response = await fetch('/add-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    const result = await response.json(); // Parse the response from the server

    if (response.ok) {
      alert(result.message); // Show success message
      document.getElementById('productForm').reset(); // Reset the form after success
    } else {
      alert(`Error: ${result.message}`); // Show error message if any
    }
  } catch (error) {
    console.error('Error adding product:', error);
    alert('Failed to add product.'); // Show error alert if request fails
  }
});
