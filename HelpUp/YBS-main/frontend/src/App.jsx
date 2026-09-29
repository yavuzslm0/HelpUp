import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NewTicket from './pages/NewTicket';

// Layout'larımızı import ediyoruz
import AuthLayout from './layouts/AuthLayout.jsx'; // 🔹 .jsx eklendi
import DashboardLayout from './layouts/DashboardLayout.jsx'; // 🔹 .jsx eklendi

// Sayfalarımızı import ediyoruz
import Login from './pages/Login.jsx'; // 🔹 .jsx eklendi
import Register from './pages/Register.jsx'; // 🔹 .jsx eklendi
import Dashboard from './pages/Dashboard.jsx'; // 🔹 .jsx eklendi

export default function App() {
  return (
    <Routes>
      {/* ==================================================
        1) AUTH ROTALARI (Giriş yapmamış kullanıcı)
        ================================================== */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* ==================================================
        2) DASHBOARD ROTALARI (Giriş yapmış kullanıcı)
        ================================================== */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-ticket" element={<NewTicket />} />
        {/* <Route path="/taleplerim" element={<Taleplerim />} />
          <Route path="/raporlar" element={<Raporlar />} /> 
        */}
      </Route>

      {/* ==================================================
        3) BAŞLANGIÇ YÖNLENDİRMESİ
        ================================================== */}
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}