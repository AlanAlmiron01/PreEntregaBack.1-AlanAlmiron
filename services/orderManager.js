import Order from '../models/order.model.js';

class OrderManager {
  async create(data) {
    const newOrder = await Order.create(data);
    return newOrder;
  }

  async read(filter = {}) {
    return await Order.find(filter);
  }

  async readOne(id) {
    return await Order.findById(id);
  }

  async updateOne(id, data) {
    return await Order.findByIdAndUpdate(id, data, { new: true });
  }

  async destroyOne(id) {
    return await Order.findByIdAndDelete(id);
  }
}

export default OrderManager;
