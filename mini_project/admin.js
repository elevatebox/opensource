document.addEventListener("DOMContentLoaded", () => {
  const productList = document.querySelector(".product-list");
  const products = JSON.parse(localStorage.getItem("products")) || [];

  console.log(products); // Check if image URLs are correct

  products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>Price: ${product.price}/-</p>
          <p>Category: ${product.category}</p>
      `;

      productList.appendChild(productCard);
  });
});
