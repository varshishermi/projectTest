//const router = require('express').Router();
//const Cart = require('../models/Cart');
//const Product = require('../models/Product');
//const isAuth = require('../middlewares/isAuth')
//
//
////exports.addToCart = async (req, res) => {
////  try {
////    const { productId, quantity } = req.body;
////    const user = req.user; // Assuming you have user information available from session or token
////
////    // Find the cart for the user or create a new one if it doesn't exist
////    let cart = await Cart.findOne({ user: user._id });
////    if (!cart) {
////      cart = new Cart({ user: user._id, items: [] });
////    }
////
////    // Check if the product already exists in the cart
////    const productIndex = cart.items.findIndex(item => item.product.toString() === productId);
////    if (productIndex > -1) {
////      // Update the quantity of the existing product
////      cart.items[productIndex].quantity += quantity;
////    } else {
////      // Add new product to the cart
////      cart.items.push({ product: productId, quantity });
////    }
////
////    // Save the cart
////    await cart.save();
////
////    res.status(200).json({ message: 'Product added to cart', cart });
////  } catch (error) {
////    res.status(500).json({ message: 'Error adding to cart', error: error.message });
////  }
////};
////
////exports.getCart = async (req, res) => {
////  try {
////    const user = req.user; // User should be retrieved from session or token
////
////    // Populate the items in the cart with product details
////    const cart = await Cart.findOne({ user: user._id }).populate('items.product');
////    if (!cart) {
////      return res.status(404).json({ message: 'Cart not found' });
////    }
////
////    res.status(200).json({ cart });
////  } catch (error) {
////    res.status(500).json({ message: 'Error retrieving cart', error: error.message });
////  }
////};
//
//// You might also want to implement update and delete functionality
//
//// Middleware to check authentication
//router.use(isAuth);
//
//// Route to handle adding a product to the cart
//router.post('/add', async (req, res) => {
//    const { productId, quantity } = req.body;
//    const user = req.user; // Assuming isAuth middleware adds user to req
//
//    try {
//        let cart = await Cart.findOne({ user: user._id });
//        if (!cart) {
//            cart = new Cart({ user: user._id, items: [] });
//        }
//
//        const productIndex = cart.items.findIndex(item => item.product.toString() === productId);
//        if (productIndex > -1) {
//            cart.items[productIndex].quantity += quantity;
//        } else {
//            cart.items.push({ product: productId, quantity });
//        }
//
//        await cart.save();
//        res.status(200).json({ message: 'Product added to cart', cart });
//    } catch (error) {
//        res.status(500).json({ message: 'Error adding to cart', error: error.message });
//};
//
//// Route to get the user's cart
//router.get('/cartdetails', async (req, res) => {
//    const user = req.user; // Assuming isAuth middleware adds user to req
//
//    try {
//        const cart = await Cart.findOne({ user: user._id }).populate('items.product');
//        if (!cart) {
//            return res.status(404).json({ message: 'Cart not found' });
//        }
//        res.status(200).json({ cart });
//    } catch (error) {
//        res.status(500).json({ message: 'Error retrieving cart', error: error.message });
//    }
//})
//
//module.exports = router;


const router = require('express').Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const isAuth = require('../middlewares/isAuth');
const auth = require('../middlewares/auth');

// Middleware to check authentication
router.use(isAuth);

// Route to handle adding a product to the cart
router.post('/add', isAuth, async (req, res) => {
    const { productId, quantity } = req.body;
    const user = req.user; // Assuming isAuth middleware adds user to req

    try {
        let cart = await Cart.findOne({ user: user._id });
        if (!cart) {
            cart = new Cart({ user: user._id, items: [] });
        }

        const productIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (productIndex > -1) {
            cart.items[productIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart', error: error.message });
    }
}); // <-- This closing brace and parenthesis were missing

// Route to get the user's cart
router.get('/getCart', isAuth, async (req, res) => {
    const user = req.user; // Assuming isAuth middleware adds user to req

    try {
        const cart = await Cart.findOne({ user: user._id }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart', error: error.message });
    }
});

module.exports = router;
