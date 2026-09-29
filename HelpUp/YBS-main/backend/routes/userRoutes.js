// routes/userRoutes.js

const express = require('express');
const router = express.Router();

// Controller fonksiyonlarımızı import et
const { registerUser, loginUser } = require('../controllers/userController.js');

// Rotaları tanımla
// /api/users/register
router.post('/register', registerUser);

// /api/users/login
router.post('/login', loginUser);

module.exports = router;