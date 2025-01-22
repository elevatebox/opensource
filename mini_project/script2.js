const products = [
  { name: "Brinjal", price: "40/-", image: "brinjal.jpg" },
  { name: "Tomato", price: "50/-", image: "tomatos_store.jpg" },
  { name: "Potatoes", price: "40/-", image: "potatoes_store.webp" },
  { name: "Onion", price: "72/-", image: "onion_store.webp" },
  { name: "Lady Fingers", price: "60/-", image: "ladyfingers_store.webp" },
  { name: "Kottimera", price: "20/-", image: "Kottimera.webp" },
  { name: "Curry Leaaves", price: "15/-", image: "curryleaves.jpg" },
];

const productList = document.querySelector(".product-list");

// Render products dynamically
products.forEach((product) => {
  const productCard = document.createElement("div");
  productCard.classList.add("product-card");
  productCard.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>${product.price}</p>
    <button>Add to Cart</button>
  `;
  productList.appendChild(productCard);
});

async function fetchProducts(category) {
  const response = await fetch(`/products?category=${category}`);
  const products = await response.json();
  
  const productList = document.getElementById('productList');
  productList.innerHTML = ''; // Clear existing products

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
}

// Fetch and display products for vegetables category
fetchProducts('fruits');
// Cart functionality
let cartCount = 0;
document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && e.target.innerText === "Add to Cart") {
    cartCount++;
    document.querySelector(".cart span").innerText = `Cart (${cartCount})`;
  }
});
