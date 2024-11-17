// JavaScript for adding interactivity
document.querySelectorAll(".product-card button").forEach((button) => {
    button.addEventListener("click", () => {
        alert("Item added to cart!");
    });
});
