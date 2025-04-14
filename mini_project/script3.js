const products = [
    { name: "Apple", price: "32/-", image: "apple.jpeg" },
    { name: "Banana", price: "50/-", image: "bananas.jpg" },
    { name: "Dragon Fruit", price: "40/-", image: "dragonfruit.avif" },
    { name: "Kiwi", price: "45/-", image: "kiwi.jpeg" },
    { name: "Grapes", price: "60/-", image: "grapes.jpeg" },
    { name: "Black Grapes", price: "42/-", image: "blackgrapes.jpg" },
    { name: "Guava", price: "15/-", image: "guava.jpg" },
    {}
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
  