import React from 'react';
import '../css/Sidebar.css'; // 🔹 YENİ CSS DOSYASINI IMPORT ET
import { Link } from 'react-router-dom';

export default function Sidebar() {
 const menuItems = [
    { label: 'Dashboard', path: '/dashboard', active: true },
    { label: 'Taleplerim', path: '/taleplerim' },
    { label: 'Talep Oluştur', path: '/new-ticket' }, // <-- İşte sihirli adres burası!
    { label: 'Varlık Yönetimi', path: '/assets' },
    { label: 'Raporlar', path: '/reports' },
    { label: 'Yönetim Paneli', path: '/admin' },
  ];

  return (
    <div className="sidebar-container">
      {/* Logo / ürün adı */}
      <div className="sidebar-logo-section">
        <div className="sidebar-logo-icon">IT</div>

        <div className="sidebar-logo-text-group">
          <div className="sidebar-logo-title">HelpUP Çözüm</div>
          <div className="sidebar-logo-subtitle">Destek Portalı</div>
        </div>
      </div>

      {/* Menü */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link 
            to={item.path} 
            key={item.label}
            className={`sidebar-menu-item ${item.active ? 'active' : ''}`}
            style={{ 
              display: 'block', 
              padding: '10px 15px', 
              color: 'white', 
              textDecoration: 'none',
              marginBottom: '5px',
              borderRadius: '8px',
              backgroundColor: item.active ? 'rgba(255,255,255,0.1)' : 'transparent'
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Versiyon / footer */}
      <div className="sidebar-footer">v1.0 • Internal</div>
    </div>
  );
}