const express = require('express');     // Web framework for Node.js
const mongoose = require('mongoose');    // MongoDB object modeling tool
const cors = require('cors');           // Enable Cross-Origin Resource Sharing
const bcrypt = require('bcryptjs');     // For password hashing
const jwt = require('jsonwebtoken');     // For generating authentication tokens


const app = express();// to Initialize express application

app.use(express.json());    // Parse JSON bodies in requests
app.use(cors());           // Enable CORS for all routes

const MONGODB_URI = 'mongodb://localhost:27017/ecommerceApp';//replaces with your actual database URL

mongoose.connect(MONGODB_URI)// Connects to MongoDB

    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({// defines structure for user documents

    email: {
        type: String,
        required: true,
        unique: true       // Ensure email addresses are unique
    },
    password: {
        type: String,
        required: true   // Ensure passwords are unique
    },
    name: String,
    address: String
});

const productSchema = new mongoose.Schema({// defines structure for product documents
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0            // Ensure price is not negative
    },
    description: String,
    stock: {
        type: Number,
        required: true,
        min: 0
    }
});

const orderSchema = new mongoose.Schema({// defines structure for order documents

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',        // Reference to User model
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'  // Reference to Product model
        },
        quantity: Number,
        price: Number      // Store price at time of purchase
    }],
    totalAmount: Number,
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,        //date when order gets created
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);// Create models from schemes
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);

const authenticateUser = async (req, res, next) => {
    try 
        const token = req.header('Authorization').replace('Bearer ', '');  // Get token from header

        const decoded = jwt.verify(token, 'your_jwt_secret');    // Verify token

        const user = await User.findById(decoded.userId);        // Find user by ID from token

        
        if (!user) {
            throw new Error();
        }
        
        req.user = user;    // Attach user to request object
        next();             // Continue to next middleware/route handler
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate' });
    }
};

app.post('/api/users/register', async (req, res) => {// used to Register new user

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 8); // Hash password before saving

        
        const user = new User({  // Create new user with hashed password and email
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name,
            address: req.body.address
        });
        
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/api/users/login', async (req, res) => {// User login
    try {
        // Find user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        // Compare password with hashed password
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/products', async (req, res) => {// Get all products

    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/products', async (req, res) => {// Add new product (admin only)

    try {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            stock: req.body.stock
        });
        
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Create new order
app.post('/api/orders', authenticateUser, async (req, res) => {
    try {
        // Calculate total amount and prepare products array
        let totalAmount = 0;
        const productsWithDetails = [];
        
        // Process each product in the order
        for (let item of req.body.products) {
            const product = await Product.findById(item.productId);
            if (!product || product.stock < item.quantity) {
                return res.status(400).json({ message: 'Product unavailable' });
            }
            
            // Add product details to order
            productsWithDetails.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            });
            
            // Update total amount
            totalAmount += product.price * item.quantity;
            
            // Update product stock
            product.stock -= item.quantity;
            await product.save();
        }
        
        // Create new order
        const order = new Order({
            user: req.user._id,
            products: productsWithDetails,
            totalAmount: totalAmount
        });
        
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get user's orders
app.get('/api/orders', authenticateUser, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('products.product');  // Replace product IDs with actual product details
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});