import React from 'react';
import {
  PieChart, Pie, Cell, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';
import '../css/ChartsSection.css';

export default function ChartsSection() {
  // Talep durum dağılımı
  const statusData = [
    { name: 'Yeni', value: 120 },
    { name: 'İşlemde', value: 200 },
    { name: 'Beklemede', value: 45 },
    { name: 'Çözüldü', value: 310 },
  ];
  const COLORS = ['#7b8ce3', '#a37de6', '#6a6de2', '#c084fc'];

  // Son 7 gün data
  const last7daysData = [
    { gun: 'Pzt', talep: 32 },
    { gun: 'Sal', talep: 28 },
    { gun: 'Çar', talep: 41 },
    { gun: 'Per', talep: 22 },
    { gun: 'Cum', talep: 36 },
    { gun: 'Cmt', talep: 15 },
    { gun: 'Paz', talep: 18 },
  ];

  // Grafik kütüphanesi (recharts) için gereken stil objeleri
  const tooltipStyle = { fontSize: '12px', borderRadius: '8px' };
  const legendStyle = { fontSize: '12px' };
  const axisTickStyle = { fontSize: 12, stroke: '#6b7280' };

  return (
    <div className="charts-section-container">
      {/* SOL PASTA GRAFİK */}
      <div className="chart-card">
        <div className="chart-title">Talep Durum Dağılımı</div>
        <div className="chart-subtitle">Canlı sistemdeki durumlara göre</div>

        <div className="chart-wrapper">
          {/* 🔹 DEĞİŞİKLİK BURADA: height={220} eklendi */}
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value" nameKey="name"
                cx="50%" cy="50%"
                innerRadius={45} outerRadius={70}
                paddingAngle={3}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={legendStyle} />
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SAĞ BAR GRAFİK */}
      <div className="chart-card">
        <div className="chart-title">Son 7 Günde Açılan Talepler</div>
        <div className="chart-subtitle">Gün bazında açılan talep adedi</div>

        <div className="chart-wrapper">
          {/* 🔹 DEĞİŞİKLİK BURADA: height={220} eklendi */}
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={last7daysData}>
              <CartesianGrid stroke="#eee" strokeDasharray="4 4" />
              <XAxis dataKey="gun" tick={axisTickStyle} />
              <YAxis tick={axisTickStyle} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="talep" fill="url(#gradientBar)" radius={[6, 6, 0, 0]} barSize={32} />
              <defs>
                <linearGradient id="gradientBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#7b8ce3" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}