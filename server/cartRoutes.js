// This could be in a separate file like routes/cartRoutes.js
// Import the necessary models and middleware

//
const Cart = require('./models/Cart');
const isAuth = require('./middlewares/isAuth'); // Assuming you have an auth middleware to verify users
const cartController = require('./controllers/cartController');


//module.exports = (app) => {
//  app.post('/api/cart/add',  cartController.addToCart);
//  app.get('/api/getCart', async (req, res) => {
//    try {
//      // Assuming the isAuth middleware adds the user's id to req.user.id
//      const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
//      if (!cart) {
//        // If no cart is found, you might want to create one or return an empty cart
//        return res.status(404).json({ message: 'Cart not found' });
//      }
//      res.json({ cartItems: cart.items });
//    } catch (error) {
//      console.error('Error retrieving cart:', error);
//      res.status(500).json({ message: 'Error retrieving cart data' });
//    }
//  });
//};
