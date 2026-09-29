import React from 'react';
import StatCardRow from '../components/StatCardRow.jsx';   // 🔹 .jsx eklendi
import ChartsSection from '../components/ChartsSection.jsx'; // 🔹 .jsx eklendi
import TicketsTable from '../components/TicketsTable.jsx';   // 🔹 .jsx eklendi
// import ChartsRow from '../components/ChartsRow.jsx';    // 🔹 .jsx eklendi

import '../css/Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* İSTATİSTİK KARTLARI */}
      <StatCardRow />

      {/* GRAFİKLER */}
      <ChartsSection />

      {/* SON AKTİF TALEPLER TABLOSU */}
      <TicketsTable />

    </div>
  );
}