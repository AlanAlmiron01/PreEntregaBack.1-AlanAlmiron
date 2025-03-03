import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: 'Default Category' },
  thumbnails: { type: [String], default: ['https://via.placeholder.com/150'] },
  price: { type: Number, default: 1 },
  stock: { type: Number, default: 1 },
  description: { type: String, default: 'No description provided' }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
