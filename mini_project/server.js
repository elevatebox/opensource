const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.static('public'));

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Route to handle product submissions
app.post('/add-product', upload.single('productImage'), (req, res) => {
  const { productName, productPrice, productCategory } = req.body;
  const productImage = req.file ? req.file.filename : null;

  if (!productName || !productPrice || !productCategory || !productImage) {
    return res.status(400).send('All fields are required.');
  }

  const newProduct = {
    name: productName,
    price: productPrice,
    category: productCategory,
    image: `/uploads/${productImage}`, // Path to the uploaded file
  };

  console.log('New Product:', newProduct);
  res.status(201).send(newProduct); // You can save this data to a database
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
