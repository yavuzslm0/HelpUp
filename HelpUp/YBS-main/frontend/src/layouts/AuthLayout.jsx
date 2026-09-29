import React from 'react';
import { Outlet } from 'react-router-dom';
import logo from '../assets/it-helpdesk-logo.png';
import '../css/AuthLayout.css';

export default function AuthLayout() {
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {/* Sol: Form Kartı */}
        <div className="auth-card">
          <Outlet /> {/* 🔹 Login.jsx veya Register.jsx buraya gelecek */}
        </div>

        {/* Sağ: Logo Kısmı */}
        <div className="auth-logo-section">
          <img
            src={logo}
            alt="BT Yardım Masası Logosu"
            className="auth-logo-image"
          />
        </div>
      </div>
    </div>
  );
}