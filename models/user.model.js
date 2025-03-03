import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  photo: { type: String, default: 'https://via.placeholder.com/150' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'USER' }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
