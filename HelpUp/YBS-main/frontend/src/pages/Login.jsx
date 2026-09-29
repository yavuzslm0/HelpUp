// frontend/src/pages/Login.jsx

// 1. GEREKLİ IMPORT'LARI EKLEDİK
import React, { useState } from 'react'; // useState eklendi
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios eklendi
import '../css/AuthForm.css';

export default function Login() {
  const navigate = useNavigate();

  // 2. FORM VERİLERİNİ VE HATALARI TUTMAK İÇİN STATE'LERİ EKLEDİK
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null); // Hata mesajı için

  // 3. INPUT DEĞİŞİKLİKLERİNİ YAKALAYAN FONKSİYON
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // 4. ESKİ handleSubmit FONKSİYONUNU, BACKEND'E BAĞLANAN YENİSİYLE GÜNCELLEDİK
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Eski hataları temizle

    const userData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      // Backend'e (Mutfak) isteği gönder
      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        userData
      );

      // BAŞARILI! Token'ı tarayıcı hafızasına kaydet
      localStorage.setItem('user', JSON.stringify(response.data));

      // Dashboard'a yönlendir
      navigate('/dashboard');

    } catch (err) {
      // BAŞARISIZ! (Örn: "Geçersiz şifre")
      console.error("--- HATA DETAYI ---", err);
      let message = 'Bir hata oluştu';
      if (err.response) {
        message = err.response.data.message || err.response.data || 'Sunucudan bir hata geldi';
      } else if (err.request) {
        message = 'Sunucuya bağlanılamadı. Backend terminalini kontrol edin.';
      } else {
        message = err.message;
      }
      setError(message); // Hatayı ekranda göster
    }
  };

  // 5. TASARIM KODUNUZ (GÖRSEL YAPI) AYNEN KORUNDU
  // Sadece input'lara 'name', 'value' ve 'onChange' eklendi.
  return (
    <div className="auth-form-container">
      <h3 className="auth-brand-title">HELP UP</h3>
      <p className="auth-brand-subtitle">Destek Çözümünüz</p>

      <h5 className="auth-mode-title">Giriş Yap</h5>

      <p className="auth-mode-toggle">
        Hesabınız yok mu?{' '}
        <Link to="/register" className="auth-link">
          Buradan kaydolun
        </Link>
      </p>

      {/* HATA MESAJI GÖSTERME ALANI EKLENDİ */}
      {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="loginEmail" className="form-label">
            E-posta
          </label>
          <input
            type="email"
            className="form-control"
            id="loginEmail"
            placeholder="E-posta adresiniz"
            required
            name="email" // <-- MANTIK İÇİN EKLENDİ
            value={formData.email} // <-- MANTIK İÇİN EKLENDİ
            onChange={onChange} // <-- MANTIK İÇİN EKLENDİ
          />
        </div>

        <div className="form-group">
          <label htmlFor="loginPassword" className="form-label">
            Şifre
          </label>
          <input
            type="password"
            className="form-control"
            id="loginPassword"
            placeholder="Şifreniz"
            required
            name="password" // <-- MANTIK İÇİN EKLENDİ
            value={formData.password} // <-- MANTIK İÇİN EKLENDİ
            onChange={onChange} // <-- MANTIK İÇİN EKLENDİ
          />
        </div>

        {/* Bu kısma hiç dokunulmadı */}
        <div className="form-options">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="remember"
            />
            <label className="form-check-label" htmlFor="remember">
              Beni hatırla
            </label>
          </div>
          <a href="#" className="form-forgot-link">
            Şifremi unuttum
          </a>
        </div>

        <button type="submit" className="form-button">
          Giriş Yap
        </button>
      </form>
    </div>
  );
}