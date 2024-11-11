window.onload = async () => {
    const groceryListElement = document.getElementById('grocery-list');
  
    try {
      const response = await fetch('http://localhost:5000/api/grocery');
      const groceryItems = await response.json();
      
      groceryItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - Quantity: ${item.quantity}`;
        groceryListElement.appendChild(listItem);
      });
    } catch (error) {
      console.error('Error fetching grocery items:', error);
    }
  };

  

  document.getElementById('add-item-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const quantity = document.getElementById('quantity').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const category = document.getElementById('category').value;
  
    const newItem = { name, quantity, expiryDate, category };
  
    try {
      await fetch('http://localhost:5000/api/grocery/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      alert('Item added successfully!');
      window.location.href = 'index.html';  // Redirect back to the main page
    } catch (error) {
      alert('Error adding item');
    }
  });
  