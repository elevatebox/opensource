const products = [
  {
    name: 'Product 1',
    price: '$10.00',
    image: 'product1.jpg'
  },
  {
    name: 'Product 2',
    price: '$20.00',
    image: 'product2.jpg'
  },
  // Add more products as needed
];

const productList = document.querySelector('.product-list');

products.forEach(product => {
  const productCard = document.createElement('div');
  productCard.classList.add('product-card');
  
  productCard.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>${product.price}</p>
    <button>Add to Cart</button>
  `;

  productList.appendChild(productCard);
});

// ----> Add the cart functionality here:

let cartCount = 0;

function addToCart() {
  cartCount++;
  document.querySelector('.cart').innerText = `Cart (${cartCount})`;
}

// Attach event listeners to all "Add to Cart" buttons
document.querySelectorAll('.product-card button').forEach(button => {
  button.addEventListener('click', addToCart);
});
