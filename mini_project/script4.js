const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Directory to save uploaded files

app.post('/add-product', upload.single('productImage'), (req, res) => {
  const { productName, productPrice, productCategory } = req.body;
  const productImage = req.file;

  if (!productImage) {
    return res.status(400).send('Image upload failed.');
  }

  // Save product details to database (including image file path)
  console.log({
    productName,
    productPrice,
    productCategory,
    productImagePath: productImage.path,
  });

  res.send('Product added successfully!');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
