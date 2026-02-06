# Portfolio Website - Wijaya Ganda Prasetyo

Website portofolio pribadi untuk Mobile Developer yang menampilkan keahlian, pengalaman, dan proyek-proyek yang telah dikerjakan.

## 🚀 Fitur

- **Desain Modern & Responsif** - Tampil sempurna di semua perangkat
- **Upload Foto Profil** - Dapat mengupload dan menyimpan foto profil
- **Manajemen Portofolio** - Tambah proyek baru dengan deskripsi lengkap
- **Animasi Smooth** - Transisi dan animasi yang halus
- **Local Storage** - Data tersimpan di browser

## 📁 Struktur Folder

```
portfolio-website/
│
├── index.html          # Halaman utama
├── css/
│   └── style.css       # File styling
├── js/
│   └── script.js       # Interaktivitas
├── assets/
│   ├── profile-placeholder.jpg    # Placeholder foto profil
│   └── portfolio-placeholder.jpg  # Placeholder portofolio
└── README.md
```

## 🛠️ Teknologi yang Digunakan

- **HTML5** - Struktur website
- **CSS3** - Styling dan animasi
- **JavaScript (Vanilla)** - Interaktivitas
- **Font Awesome** - Icon library
- **Local Storage API** - Penyimpanan data lokal

## 📝 Cara Menggunakan

### 1. Upload Foto Profil
- Hover pada foto profil di section Hero
- Klik tombol "Upload Foto"
- Pilih foto dari komputer Anda
- Foto akan tersimpan otomatis

### 2. Menambah Proyek Portofolio
- Scroll ke section Portfolio
- Klik card "Tambah Proyek"
- Isi form dengan detail proyek:
  - Judul Proyek
  - Deskripsi Singkat
  - Detail Proyek
  - Teknologi yang Digunakan
  - Upload Gambar Proyek
- Klik "Tambah Proyek"

### 3. Melihat Detail Proyek
- Hover pada card proyek
- Klik tombol "Lihat Detail"
- Modal akan muncul dengan informasi lengkap

## 🎨 Kustomisasi

### Mengubah Warna Theme
Edit file `css/style.css` pada bagian `:root`:

```css
:root {
    --primary-color: #2563eb;    /* Warna utama */
    --secondary-color: #1e40af;  /* Warna sekunder */
    --accent-color: #3b82f6;     /* Warna aksen */
}
```

### Mengubah Informasi Kontak
Edit file `index.html` pada section Contact:

```html
<div class="contact-card">
    <i class="fas fa-envelope"></i>
    <h4>Email</h4>
    <p>wijaya.ganda@email.com</p> <!-- Ubah di sini -->
</div>
```

### Menambah Link Social Media
Edit file `index.html` pada bagian social links:

```html
<a href="https://linkedin.com/in/username" class="social-link">
    <i class="fab fa-linkedin"></i>
</a>
```

## 🌐 Cara Menjalankan

### Opsi 1: Buka Langsung
1. Buka file `index.html` di browser

### Opsi 2: Menggunakan Live Server (Recommended)
1. Install ekstensi "Live Server" di VS Code
2. Klik kanan pada `index.html`
3. Pilih "Open with Live Server"

### Opsi 3: Menggunakan Python
```bash
# Python 3
python -m http.server 8000

# Buka browser: http://localhost:8000
```

## 📱 Responsif

Website ini sudah responsif dan dapat diakses dengan baik di:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 💾 Data Persistence

Website menggunakan **Local Storage** untuk menyimpan:
- Foto profil yang diupload
- Daftar proyek portofolio

Data akan tetap tersimpan meskipun browser ditutup.

## 🔄 Update & Maintenance

Untuk menghapus data yang tersimpan:
1. Buka Developer Tools (F12)
2. Pilih tab "Application" atau "Storage"
3. Pilih "Local Storage"
4. Hapus data yang diinginkan

## 📞 Support

Jika ada pertanyaan atau masalah, silakan hubungi:
- Email: wijaya.ganda@email.com
- LinkedIn: [Profile Link]
- GitHub: [Repository Link]

## 📄 License

Website ini dibuat untuk keperluan portofolio pribadi.

---

**Dibuat dengan ❤️ oleh Wijaya Ganda Prasetyo**
