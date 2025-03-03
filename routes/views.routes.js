import { Router } from 'express';
import ProductManager from '../services/productManager.js';

const router = Router();
const productManager = new ProductManager();

// Landing Page: GET /
router.get('/', async (req, res, next) => {
  try {
    const { category, page = 1, limit = 40 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    const products = await productManager.read(filter, { page, limit });
    res.render('index', { products });
  } catch (error) {
    next(error);
  }
});

// Real-Time Products Page: GET /products/real
router.get('/products/real', async (req, res, next) => {
  try {
    const products = await productManager.read();
    res.render('products_real', { products });
  } catch (error) {
    next(error);
  }
});

// Product Detail Page: GET /products/:pid
router.get('/products/:pid', async (req, res, next) => {
  try {
    const product = await productManager.readOne(req.params.pid);
    if (!product) return res.status(404).send('Product not found');
    res.render('product_detail', { product, hardcodedUserId: '609e12672f8fb814c89e5f00' });
  } catch (error) {
    next(error);
  }
});

// Checkout Page: GET /checkout
router.get('/checkout', (req, res) => {
  res.render('checkout');
});

// User Registration Page: GET /users/register
router.get('/users/register', (req, res) => {
  res.render('register');
});

// User Login Page: GET /users/login
router.get('/users/login', (req, res) => {
  res.render('login');
});

// User Profile Page: GET /users/:uid
router.get('/users/:uid', (req, res) => {
  res.render('user_profile', { userId: req.params.uid });
});

// Cart Page: GET /carts/:uid
router.get('/carts/:uid', (req, res) => {
  res.render('cart', { userId: req.params.uid });
});

export default router;
