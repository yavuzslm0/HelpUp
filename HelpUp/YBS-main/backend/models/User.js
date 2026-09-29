const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // login sırasında .select('+password') ile alacağız
  },
  role: {
    type: String,
    default: 'user',
  },
});

// Kayıt öncesinde şifreyi hashle
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Şifre değişmemişse geç
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
