const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');
const User = require('../models/User');
const mongoose = require('mongoose');

// YENİ TALEP OLUŞTURMA
router.post('/', async (req, res) => {
  const { product, description, userId } = req.body;

  try {
    if (!product || !description || !userId) {
      return res.status(400).json({ mesaj: 'product, description ve userId zorunludur' });
    }

    // ObjectId kontrolü (ÇOK ÖNEMLİ)
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ mesaj: 'Geçersiz kullanıcı ID' });
    }

    const ticket = await Ticket.create({
      product,
      description,
      user: userId,
      status: 'Yeni'
    });

    res.status(201).json(ticket);
  } catch (error) {
    console.error('TICKET CREATE ERROR:', error.message);
    res.status(500).json({
      mesaj: 'Sunucu hatası',
      hata: error.message
    });
  }
});

module.exports = router;
