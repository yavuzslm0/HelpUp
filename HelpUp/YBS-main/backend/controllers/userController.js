// controllers/userController.js

const User = require('../models/User'); // User Modelimiz
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

// JWT Token oluşturmak için küçük bir yardımcı fonksiyon
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token 30 gün geçerli olsun
  });
};

/**
 * @desc    Yeni bir kullanıcı kaydeder (Register)
 * @route   POST /api/users/register
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  // 1. Gerekli alanlar geldi mi?
  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error('Lütfen tüm zorunlu alanları doldurun');
  }

  // 2. Kullanıcı zaten var mı? a
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('Bu e-posta adresi zaten kayıtlı');
  }

  // 3. Kullanıcıyı oluştur
  // Şifre hash'leme işlemi User modelindeki (User.js) 'pre.save' kancası ile otomatik yapılacak
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role,
  });

  // 4. Kullanıcı başarıyla oluşturulduysa, token ile birlikte cevap dön
  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id), // Token oluştur ve gönder
    });
  } else {
    res.status(400);
    throw new Error('Geçersiz kullanıcı verisi');
  }
});

/**
 * @desc    Kullanıcı girişi yapar (Login)
 * @route   POST /api/users/login
 * @access  Public
 */
// ... loginUser fonksiyonunun içindesiniz ...
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1. Kullanıcıyı e-postadan bul. (Şifreyi de çekmek için .select('+password'))
  const user = await User.findOne({ email }).select('+password'); // <-- DÜZELTİLDİ
  // 2. Kullanıcı var mı? Ve şifre doğru mu?
  // Not: User modeline şifre karşılaştırma metodu eklemeliyiz.
  // ŞİMDİLİK BCRYPT İLE BURADA YAPALIM:
  if (user && (await bcrypt.compare(password, user.password))) {
    // Şifre doğru, token ile cevap dön
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    // Şifre veya e-posta yanlış
    res.status(401); // Yetkisiz
    throw new Error('Geçersiz e-posta veya şifre');
  }
});

// Fonksiyonları dışa aktar
module.exports = {
  registerUser,
  loginUser,
};