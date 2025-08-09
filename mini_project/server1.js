const express = require('express'); //requiring the express module. We can create multiple routes
const path = require('path'); //creating a path for the route
const fs = require('fs'); //file system
const bodyParser = require('body-parser'); //body-parser is a middleware that parses the body of an incoming HTTP request 
const cors = require('cors')
const app = express(); //running application as express
const port = 3000; //local host number for running the server

                            
app.use(bodyParser.json()); // Use body-parser to parse JSON requests


app.use(express.static(path.join(__dirname))); // Serve static files like HTML, CSS, and images 

// Load products from products.json
function loadProducts() {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'products.json'), 'utf8'); //reading the json file
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Save products to products.json
function saveProducts(products) {
    fs.writeFileSync(path.join(__dirname, 'products.json'), JSON.stringify(products, null, 2));  //writing the 
}

// Add a product
app.post('/add-product', (req, res) => {
    const newProduct = req.body;

    // Load existing products
    const products = loadProducts();

    // Add the new product to the list
    products.push(newProduct);

    // Save the updated list
    saveProducts(products);

    res.json({ message: 'Product added successfully!' });
});

// Get products for a category
app.get('/products/:category', (req, res) => {
    const category = req.params.category;
    const products = loadProducts();

    // Filter products by category
    const filteredProducts = products.filter(product => product.productCategory === category);

    res.json(filteredProducts);
});

// Serve the HTML pages
app.get('/store.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'store.html'));
});

app.get('/fruits.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'fruits.html'));
});

app.get('/organic.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'organic.html'));
});

app.get('/equipment.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'equipment.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
