import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
import '../css/DashboardLayout.css';

export default function DashboardLayout() {

  return (
    <div className="dashboard-layout">
      {/* SOL TARAF: SIDEBAR */}
      <Sidebar />

      {/* SAĞ TARAF: NAVBAR + ANA İÇERİK */}
      <div className="dashboard-main-content">
        
        {/* 🔹 3. Navbar'a 'onLogout' prop'u geçirilmiyor */}
        <Navbar />

        {/* ANA İÇERİK (Sayfalar buraya gelecek) */}
        <main className="dashboard-page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}