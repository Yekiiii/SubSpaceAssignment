const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  balance: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
