import { Router } from 'express';
import CartManager from '../../services/cartManager.js';

const router = Router();
const cartManager = new CartManager();

// Create or update a cart for a user
router.post('/', async (req, res, next) => {
  try {
    const cartData = req.body && req.body.products && req.body.user_id ? req.body : { products: [], user_id: req.body.user_id || 'guest' };
    const newCart = await cartManager.create(cartData);
    res.status(201).json({ statusCode: 201, response: newCart });
  } catch (error) {
    next(error);
  }
});

// Get cart by user_id (using query parameter)
router.get('/', async (req, res, next) => {
  try {
    const { user_id } = req.query;
    if (!user_id) return res.status(400).json({ statusCode: 400, error: 'Missing user_id query parameter' });
    const cart = await cartManager.read({ user_id });
    if (!cart) return res.status(404).json({ statusCode: 404, error: 'Cart not found' });
    res.json({ statusCode: 200, response: cart });
  } catch (error) {
    next(error);
  }
});

// Add product to cart: POST /api/carts/:cid/product/:pid
router.post('/:cid/product/:pid', async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid, quantity);
    res.json({ statusCode: 200, response: updatedCart });
  } catch (error) {
    next(error);
  }
});

// Update product quantity in cart
router.put('/:cid/product/:pid', async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const updatedCart = await cartManager.updateProductQuantity(req.params.cid, req.params.pid, quantity);
    res.json({ statusCode: 200, response: updatedCart });
  } catch (error) {
    next(error);
  }
});

// Remove product from cart
router.delete('/:cid/product/:pid', async (req, res, next) => {
  try {
    const updatedCart = await cartManager.removeProductFromCart(req.params.cid, req.params.pid);
    res.json({ statusCode: 200, response: updatedCart });
  } catch (error) {
    next(error);
  }
});

// Delete entire cart
router.delete('/:cid', async (req, res, next) => {
  try {
    const deletedCart = await cartManager.destroyOne(req.params.cid);
    res.json({ statusCode: 200, response: deletedCart });
  } catch (error) {
    next(error);
  }
});

export default router;
