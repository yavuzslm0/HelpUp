// server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // CORS paketini import et
const connectDB = require('./config/db');

// Rota dosyalarımızı import et
const userRoutes = require('./routes/userRoutes'); 
const ticketRoutes = require('./routes/ticketRoutes');
// .env dosyasını yükle
dotenv.config();

// Veritabanına bağlan
connectDB();

const app = express();

// === Middleware'leri (Ara Katmanları) Ekle ===

// 1. CORS Middleware: Frontend'den gelen isteklere izin ver
app.use(cors()); 

// 2. JSON Body Parser: Gelen isteklerin (req.body) JSON formatını okur
app.use(express.json()); 

// === Ana Test Rotası ===
app.get('/', (req, res) => {
  res.status(200).json({ message: 'ITSM Helpdesk API Çalışıyor' });
});

// === API Rotalarını Kullan ===
// /api/users ile başlayan tüm istekleri userRoutes dosyasına yönlendir
app.use('/api/users', userRoutes); 
app.use('/api/tickets', ticketRoutes);


// .env dosyasından PORT'u oku, bulamazsan 5000'i kullan
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışmaya başladı.`);
});