import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true }
  }],
  shippingInfo: {
    address: { type: String, required: true },
    phone: { type: String, required: true }
  },
  status: { type: String, default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
