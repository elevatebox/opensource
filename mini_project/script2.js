const products = [
  { name: "Onions", price: "32/-", image: "onion_store.webp" },
  { name: "Carrots", price: "50/-", image: "carrots_store.webp" },
  { name: "Potatoes", price: "40/-", image: "potatoes_store.webp" },
  { name: "Beans", price: "45/-", image: "beans_store.jpg" },
  { name: "Tomatoes", price: "60/-", image: "tomatos_store.jpg" },
  { name: "Lady Fingers", price: "42/-", image: "ladyfingers_store.webp" },
  { name: "Coriander leaves", price: "15/-", image: "Kottimera.webp" },
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

// Cart functionality
let cartCount = 0;
document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && e.target.innerText === "Add to Cart") {
    cartCount++;
    document.querySelector(".cart span").innerText = `Cart (${cartCount})`;
  }
});
