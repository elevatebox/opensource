function showHelp() {
    document.getElementById("help-modal").style.display = "block";
}

// Start chat (just a placeholder)
function startChat() {
    alert("Chat with helpline started...");
}

// Close modals
function closeModal() {
    document.getElementById("profile-modal").style.display = "none";
    document.getElementById("help-modal").style.display = "none";
}

// Update cart count
function updateCart(item) {
    cartCount++;
    document.getElementById("cart-count").innerText = cartCount;
}

// View cart (functionality placeholder)
function viewCart() {
    alert("Viewing cart...");
}
let cart = [];

function addToCart(productName, productPrice) {
  // Add item to the cart
  cart.push({ productName, productPrice });
  alert(`${productName} has been added to your cart!`);
}

function viewCart() {
  if (cart.length > 0) {
    let cartDetails = '';
    cart.forEach(item => {
      cartDetails += `<p>${item.productName} - ${item.productPrice}</p>`;
    });
    alert(`Items in your cart:\n\n${cartDetails}`);
  } else {
    alert('Your cart is empty!');
  }
}


