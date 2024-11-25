const products = [
    { name: "Organic Whole Wheat Atta", price: "110/-", image: "atta.webp" },
    { name: "Organic Mustard Oil", price: "299/-", image: "coldpressed.webp" },
    { name: "Organic Chana Dal ", price: "345/-", image: "chanadal.webp" },
    { name: "Basmati Rice", price: "300 per kg/-", image: "basmatirice.webp" },
    { name: "Organic Jaggery Powder", price: "199/-", image: "jaggery.webp" },
    { name: "Organic Moong Dal", price: "300/-", image: "moongdal.webp" },
    { name: "Organic Peanuts", price: "159/-", image: "peanuts.webp" },
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
  