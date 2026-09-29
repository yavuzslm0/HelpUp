// config/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // .env dosyasındaki MONGO_URI değişkenini okur ve bağlanmayı dener
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Bağlantı başarılı olursa konsola bilgi verir
    console.log(`MongoDB Bağlantısı Başarılı: ${conn.connection.host}`);
  } catch (error) {
    // Hata olursa konsola hatayı yazar ve sunucuyu durdurur
    console.error(`Hata: ${error.message}`);
    process.exit(1); 
  }
};

// Bu fonksiyonu başka dosyalarda (server.js) kullanabilmek için dışa aktar
module.exports = connectDB;