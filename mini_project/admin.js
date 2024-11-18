// Handle form submission
document.getElementById("productForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    // Get form data
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productImage = document.getElementById("productImage").value;
    const productCategory = document.getElementById("productCategory").value;
  
    // Create a product object
    const product = {
      name: productName,
      price: productPrice,
      image: productImage,
      category: productCategory,
    };
  
    // Save to local storage
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
  
    // Clear form
    e.target.reset();
  
    alert("Product added successfully!");
  });
  