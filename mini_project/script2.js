const products = [
  {
    name: 'Onions',
    price: '32/-',
    image: 'onion_store.webp'
  },
  {
    name: 'Carrots',
    price: '50/-',
    image: 'carrots_store.webp'
  },
  {
    name: 'Potatoes',
    price: '40/-',
    image: 'potatoes_store.webp'
  },
  {
    name: 'Beans',
    price: '45/-',
    image: 'beans_store.jpg'
  },
  {
    name: 'Tomatoes',
    price: '60/-',
    image: 'tomatos_store.jpg'
  },
  {
    name: 'Lady Fingers',
    price: '42/-',
    image: 'ladyfingers_store.webp'
  },
  {
    name: 'Coriander leaves',
    price: '15/-',
    image: 'Kottimera.webp'
  },
  {
    name: 'Capsicum(green)',
    price: '40/-',
    image: 'capsicum.webp'
  },
  {
    name: 'Capsicum(red)',
    price: '70/-',
    image: 'redcapsicum.webp'
  },
  {
    name: 'Capsicum(yellow)',
    price: '70/-',
    image: 'Capsicum-Yellow.webp'
  },
  {
    name: 'Curry Leaves',
    price: '10/-',
    image: 'curryleaves.jpg'
  },
  {
    name: 'Brinjal',
    price: '30/-',
    image: 'brinjal.jpg'
  },
  {
    name: 'Cabbage',
    price: '25/-',
    image: 'cabbage.jpg'
  },
  {
    name: 'Red Cabbage',
    price: '50/-',
    image: 'redcabbage.jpeg'
  },

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
// Fetch products from local storage and display them
document.addEventListener("DOMContentLoaded", () => {
  const productList = document.querySelector(".product-list");
  const products = JSON.parse(localStorage.getItem("products")) || [];

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <p>Category: ${product.category}</p>
    `;

    productList.appendChild(productCard);
  });
});
