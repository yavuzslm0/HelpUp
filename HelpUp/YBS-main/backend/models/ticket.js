const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // adresindeki users tablosuna bağlanır
  },
  product: {
    type: String,
    required: [true, 'Lütfen bir kategori seçin'],
    enum: [
    'Donanım Arızası', 'Yazılım Hatası', 'Ağ/Erişim Sorunu', 
    'Hesap/Şifre İşlemleri', 'Yeni Donanım Talebi', 
    'Yeni Yazılım Kurulumu', 'Telefon/İletişim', 
    'E-posta Sorunu', 'Eğitim Talebi', 'Diğer/Genel Destek'
]
  },
  description: {
    type: String,
    required: [true, 'Lütfen bir açıklama girin']
  },
  status: {
    type: String,
    enum: ['Yeni', 'Açık', 'Beklemede', 'Kapalı'],
    default: 'Yeni'
  }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);