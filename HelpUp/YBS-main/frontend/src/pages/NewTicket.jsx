import { useState } from 'react';
import axios from 'axios';
import { 
    FaLaptop, FaBug, FaWifi, FaUserLock, FaShoppingCart, 
    FaCogs, FaPhone, FaEnvelope, FaGraduationCap, FaQuestionCircle 
} from 'react-icons/fa';

// ----- 1. STİL NESNESİ (Hata almamak için en başa veya üste alıyoruz) -----
const styles = {
    container: { padding: '30px', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#1e1e3f', color: '#fff', minHeight: '100vh' },
    header: { marginBottom: '30px', borderBottom: '1px solid #4e4e6f', paddingBottom: '20px' },
    h1: { fontSize: '28px', fontWeight: '700', marginBottom: '5px' },
    h2: { fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#a0a0d0' },
    p: { fontSize: '14px', color: '#ccc' },
    contentGrid: { display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '40px' },
    formSection: { backgroundColor: '#2a2a4d', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' },
    categorySelection: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px', marginBottom: '20px' },
    card: { backgroundColor: '#3a3a60', padding: '15px', borderRadius: '10px', textAlign: 'center', cursor: 'pointer', border: '2px solid transparent', transition: '0.3s' },
    cardActive: { borderColor: '#8e44ad', backgroundColor: '#4a4a70', transform: 'scale(1.03)' },
    textarea: { width: '100%', height: '150px', padding: '15px', borderRadius: '8px', backgroundColor: '#1e1e3f', color: '#fff', border: '1px solid #4a4a70' },
    button: { padding: '12px 25px', background: '#8e44ad', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' },
    chartSection: { backgroundColor: '#2a2a4d', padding: '20px', borderRadius: '12px' },
    chartPlaceholder: { textAlign: 'center', padding: '15px', backgroundColor: '#3a3a60', borderRadius: '8px' }
};

const categories = [
    { name: 'Donanım Arızası', icon: FaLaptop, description: 'Bilgisayar, yazıcı vb.' },
    { name: 'Yazılım Hatası', icon: FaBug, description: 'Uygulama hataları.' },
    { name: 'Ağ/Erişim Sorunu', icon: FaWifi, description: 'İnternet ve VPN.' },
    { name: 'Hesap/Şifre İşlemleri', icon: FaUserLock, description: 'Şifre sıfırlama.' },
    { name: 'Yeni Donanım Talebi', icon: FaShoppingCart, description: 'Cihaz isteği.' },
    { name: 'Yeni Yazılım Kurulumu', icon: FaCogs, description: 'Yazılım kurulumu.' },
    { name: 'Telefon/İletişim', icon: FaPhone, description: 'Sabit/Mobil hat.' },
    { name: 'E-posta Sorunu', icon: FaEnvelope, description: 'Outlook ve kota.' },
    { name: 'Eğitim Talebi', icon: FaGraduationCap, description: 'Sistem eğitimi.' },
    { name: 'Diğer/Genel Destek', icon: FaQuestionCircle, description: 'Genel yardım.' }
];

function NewTicket() {
    const [product, setProduct] = useState('');
    const [description, setDescription] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        // LocalStorage'dan kullanıcıyı al
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            alert("Lütfen önce giriş yapın.");
            return;
        }
        const user = JSON.parse(storedUser);

        if (!product) {
            alert("Lütfen bir kategori seçin!");
            return;
        }

        try {
            // İsteği gönder
            await axios.post('http://localhost:5000/api/tickets', {
                product: product,
                description: description,
                userId: user._id, 
            });

            alert('Talep başarıyla oluşturuldu!');
            setProduct('');
            setDescription('');
        } catch (error) {
            console.error("Hata detayı:", error.response ? error.response.data : error.message);
            alert('Hata oluştu. Detaylar konsolda.');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.h1}>Yeni Destek Talebi Oluştur</h1>
                <p style={styles.p}>Sorununuzu en iyi anlatan kategoriyi seçin.</p>
            </div>

            <div style={styles.contentGrid}>
                <div style={styles.formSection}>
                    <form onSubmit={onSubmit}>
                        <h2 style={styles.h2}>1. Kategori Seçin</h2>
                        <div style={styles.categorySelection}>
                            {categories.map((cat) => (
                                <div 
                                    key={cat.name} 
                                    onClick={() => setProduct(cat.name)}
                                    style={{
                                        ...styles.card,
                                        ...(product === cat.name ? styles.cardActive : {})
                                    }}
                                >
                                    <cat.icon size={24} style={{ marginBottom: '10px' }} />
                                    <div style={{fontSize: '12px', fontWeight: 'bold'}}>{cat.name}</div>
                                </div>
                            ))}
                        </div>

                        <h2 style={{ ...styles.h2, marginTop: '20px' }}>2. Açıklama</h2>
                        <textarea 
                            style={styles.textarea}
                            placeholder={product ? `${product} seçildi. Detayları yazın...` : "Önce kategori seçin..."}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <button type="submit" style={styles.button}>Gönder</button>
                    </form>
                </div>

                <div style={styles.chartSection}>
                    <h2 style={styles.h2}>Bilgi Paneli</h2>
                    <div style={styles.chartPlaceholder}>
                        <p style={{fontSize: '12px'}}>Seçilen: <b>{product || 'Yok'}</b></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewTicket;