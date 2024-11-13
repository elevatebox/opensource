let cartCount = 0;

// Show profile modal
function showProfile() {
    document.getElementById("profile-modal").style.display = "block";
}

// Show help modal
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
