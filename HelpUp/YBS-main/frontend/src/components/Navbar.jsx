import React from 'react';
import { useNavigate } from 'react-router-dom'; // 🔹 1. useNavigate import edildi
import '../css/Navbar.css';

// 🔹 DEĞİŞİKLİK BURADA: Artık prop almıyoruz
export default function Navbar() {
  const navigate = useNavigate(); // 🔹 2. useNavigate hook'u çağrıldı

  // 🔹 3. handleLogout fonksiyonu Navbar'ın kendi içine taşındı
  function handleLogout() {
    console.log('Çıkış yapıldı, /login sayfasına yönlendiriliyor.');
    // TODO: Sonraki adımlarda burada token/context temizlenecek.
    navigate('/login');
  }

  return (
    <header className="navbar-container">
      <div className="navbar-title">
        HelpUP Çözüm Paneli
      </div>

      <div className="navbar-profile">
        <div className="navbar-user-info">
          <div className="navbar-user-name">
            Ahza Serhan İri
          </div>
          <div className="navbar-user-role">
            IT Destek Uzmanı
          </div>
        </div>

        <div className="navbar-user-avatar">A</div>

        {/* 🔹 4. onClick artık bu component'in kendi handleLogout fonksiyonunu çağırıyor */}
        <button onClick={handleLogout} className="navbar-logout-button">
          Çıkış Yap
        </button>
      </div>
    </header>
  );
}