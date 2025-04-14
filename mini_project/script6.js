const products = [
    { name: "Garden Rake", price: "299/-", image: "gardenrake.webp" },
    { name: "Garden Gloves", price: "150/-", image: "gloves.webp" },
    { name: "Hand Pruner Cutter", price: "345/-", image: "handprunercutter.webp" },
    { name: "Metal Stand for Plants", price: "1400/-", image: "metalstand.webp" },
    { name: "Pressure Pump", price: "199/-", image: "pump.webp" },
    { name: "Trowel", price: "299/-", image: "trowel.webp" },
    { name: "Garden Hose", price: "399/-", image: "hose.webp" },
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
fetchProducts('equipment');
  // Cart functionality
  let cartCount = 0;
  document.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" && e.target.innerText === "Add to Cart") {
      cartCount++;
      document.querySelector(".cart span").innerText = `Cart (${cartCount})`;
    }
  });
  