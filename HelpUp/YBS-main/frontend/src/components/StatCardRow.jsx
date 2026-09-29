import React from 'react';
import '../css/StatCardRow.css'; // 🔹 YENİ CSS DOSYAMIZ

function StatCard({ title, value, sub, color1, color2 }) {
  // 🔹 NOT: Renkleri dinamik olarak alabilmek için
  // inline style'a mecburuz. Bu, mimariyi bozmaz.
  const cardStyle = {
    background: `linear-gradient(135deg, ${color1}, ${color2})`,
  };

  return (
    <div className="stat-card" style={cardStyle}>
      <div className="stat-card-title">
        <span>{title}</span>
        <span className="stat-card-emoji">📈</span>
      </div>
      <div className="stat-card-body">
        <div className="stat-card-value">{value}</div>
        {sub && (
          <div className="stat-card-sub">{sub}</div>
        )}
      </div>
      <div className="stat-card-footer">
        <span>⏱</span>
        <span>Canlı durum</span>
      </div>
    </div>
  );
}

export default function StatCardRow() {
  // 🔹 NOT: Bu data, orijinal Dashboard.jsx dosyasından alındı,
  // çünkü oradaki stil (gradient) daha iyiydi.
  const cardData = [
    {
      title: "Açık Talepler",
      value: 347,
      desc: "Canlı durum • 📈",
      color1: "#7b8ce3",
      color2: "#a37de6",
    },
    {
      title: "Ort. Çözüm Süresi",
      value: "2.5 Saat",
      desc: "Canlı durum • ⏱",
      color1: "#a37de6",
      color2: "#c084fc",
    },
    {
      title: "Kapatılanlar (Bugün)",
      value: "45",
      desc: "12 Acil • ⚠",
      color1: "#7b8ce3",
      color2: "#6a6de2",
    },
  ];

  return (
    <section className="stat-card-row">
      {cardData.map((card, i) => (
        <StatCard
          key={i}
          title={card.title}
          value={card.value}
          sub={card.title === "Ort. Çözüm Süresi" ? "Saat" : null}
          color1={card.color1}
          color2={card.color2}
        />
      ))}
    </section>
  );
}