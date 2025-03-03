import Product from '../models/product.model.js';

class ProductManager {
  async create(data) {
    const newProduct = await Product.create(data);
    return newProduct;
  }

  async read(filter = {}, options = {}) {
    const { page = 1, limit = 40 } = options;
    const skip = (page - 1) * limit;
    const products = await Product.find(filter).skip(skip).limit(limit);
    return products;
  }

  async readOne(id) {
    return await Product.findById(id);
  }

  async updateOne(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  async destroyOne(id) {
    return await Product.findByIdAndDelete(id);
  }
}

export default ProductManager;
