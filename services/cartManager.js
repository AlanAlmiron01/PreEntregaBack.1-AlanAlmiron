import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

class CartManager {
  async create(cartData) {
    const newCart = await Cart.create(cartData);
    return newCart;
  }

  async read(filter = {}) {
    return await Cart.findOne(filter).populate('products.productId');
  }

  async updateOne(cartId, data) {
    return await Cart.findByIdAndUpdate(cartId, data, { new: true });
  }

  async destroyOne(cartId) {
    return await Cart.findByIdAndDelete(cartId);
  }

  async addProductToCart(cartId, productId, quantity) {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error('Cart not found');
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');
    const prodIndex = cart.products.findIndex(p => p.productId.equals(productId));
    if (prodIndex !== -1) {
      const newQuantity = cart.products[prodIndex].quantity + quantity;
      if (newQuantity > product.stock) throw new Error('Quantity exceeds available stock');
      cart.products[prodIndex].quantity = newQuantity;
    } else {
      if (quantity > product.stock) throw new Error('Quantity exceeds available stock');
      cart.products.push({ productId, quantity });
    }
    await cart.save();
    return cart;
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error('Cart not found');
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');
    const prodIndex = cart.products.findIndex(p => p.productId.equals(productId));
    if (prodIndex === -1) throw new Error('Product not found in cart');
    if (quantity > product.stock) throw new Error('Quantity exceeds available stock');
    if (quantity <= 0) {
      cart.products.splice(prodIndex, 1);
    } else {
      cart.products[prodIndex].quantity = quantity;
    }
    await cart.save();
    return cart;
  }

  async removeProductFromCart(cartId, productId) {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error('Cart not found');
    const newProducts = cart.products.filter(p => !p.productId.equals(productId));
    if (newProducts.length === cart.products.length) throw new Error('Product not found in cart');
    cart.products = newProducts;
    await cart.save();
    return cart;
  }
}

export default CartManager;
