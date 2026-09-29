import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/register',
        userData
      );

      console.log('Kayıt Başarılı:', response.data);
      alert('Kayıt başarılı! Lütfen giriş yapın.');
      navigate('/login');

    } catch (err) {
      console.error("--- HATA DETAYI (TAMAMI) ---", err);
      let message = 'Bir hata oluştu';
      if (err.response) {
        message = err.response.data.message || err.response.data || 'Sunucudan bir hata geldi';
      } else if (err.request) {
        message = 'Sunucuya bağlanılamadı. Backend terminalini kontrol edin.';
      } else {
        message = err.message;
      }
      setError(message);
    }
  };
  return (
    <div className="auth-form-container">
      <h3 className="auth-brand-title">HELP UP</h3>
      <p className="auth-brand-subtitle">Destek Çözümünüz</p>
      <h2 className="auth-mode-title">Hesap Oluştur</h2>
      <p className="auth-mode-toggle">
        Zaten hesabınız var mı?{' '}
        <Link to="/login" className="auth-link">
          Buradan giriş yapın
        </Link>
      </p>

      <form onSubmit={onSubmit}>
        {/* Hata Mesajı Alanı */}
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

        {/* İSİM ALANI (Backend'de zorunlu) */}
        <div>
          <label htmlFor="firstName" className="form-label">İsim</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            required
          />
        </div>

        {/* SOYİSİM ALANI (Backend'de zorunlu) */}
        <div>
          <label htmlFor="lastName" className="form-label">Soyisim</label>
          <input
            type="text"
            id="lastName"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            required
          />
        </div>

        {/* E-POSTA ALANI */}
        <div className='form-group'>
          <label htmlFor="email" className='form-label'>E-posta</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
          />
        </div>

        {/* ŞİFRE ALANI */}
        <div>
          <label htmlFor="password" className="form-label">Şifre</label>
          <input
            type="password"
            id="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="terms" />
          <label className="form-check-label" htmlFor="terms">
            Koşulları kabul ediyorum
          </label>
        </div>

        <button type="submit" className="form-button">Kayıt Ol</button>
      </form>
    </div>
  );
}

export default RegisterPage;