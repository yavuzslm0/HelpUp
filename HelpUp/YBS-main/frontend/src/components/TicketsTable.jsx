import React from 'react';
import '../css/TicketsTable.css'; // 🔹 YENİ CSS DOSYAMIZ

export default function TicketsTable() {
  // 🔹 NOT: Bu data, orijinal Dashboard.jsx'teki datadır.
  // Diğer TicketsTable.jsx'teki data ile birleştirilmiştir.
  const data = [
    {
      id: "ITSM-2024-00123",
      konu: "E-posta ürünleri sorunu",
      atanan: "Ahza Serhan İri",
      oncelik: "Yeni",
      durum: "İşlemde",
      son: "10 saniye önce",
    },
    {
      id: "ITSM-2024-00124",
      konu: "VPN bağlantı hatası",
      atanan: "Ahmet Yılmaz",
      oncelik: "Acil",
      durum: "İşlemde",
      son: "5 dk önce",
    },
    {
      id: "ITSM-2024-00125",
      konu: "Yetkisiz hesap talebi",
      atanan: "Yavuz Selim Baş",
      oncelik: "Yüksek",
      durum: "Açık",
      son: "8 dk önce",
    },
  ];

  return (
    <section className="table-container">
      <div className="table-title-header">
        Son Aktif Talepler
      </div>

      <div className="table-scroll-wrapper">
        <table className="tickets-table">
          <thead className="table-head">
            <tr>
              <th>Talep ID</th>
              <th>Konu</th>
              <th>Atanan Kişi</th>
              <th>Öncelik</th>
              <th>Durum</th>
              <th>Son Güncelleme</th>
            </tr>
          </thead>

          <tbody className="table-body">
            {data.map((row, ) => (
              <tr key={row.id} className="table-row">
                <td className="table-cell-id">{row.id}</td>
                <td className="table-cell">{row.konu}</td>
                <td className="table-cell">{row.atanan}</td>
                <td className="table-cell">{row.oncelik}</td>
                <td className="table-cell">{row.durum}</td>
                <td className="table-cell-muted">{row.son}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}