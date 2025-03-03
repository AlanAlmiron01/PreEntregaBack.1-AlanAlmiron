import User from '../models/user.model.js';

class UserManager {
  async create(data) {
    const newUser = await User.create(data);
    return newUser;
  }

  async read(filter = {}) {
    return await User.find(filter);
  }

  async readOne(id) {
    return await User.findById(id);
  }

  async updateOne(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true });
  }

  async destroyOne(id) {
    return await User.findByIdAndDelete(id);
  }
}

export default UserManager;
