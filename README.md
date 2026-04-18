#  Personal Portfolio - Fitriani

Website ini dibuat untuk memenuhi tugas **UTS Praktikum Pemrograman Berbasis Web (PBW)**. Website ini bersifat **Fullstack**, interaktif, dan responsif.

##  Fitur Utama
- **Interaktif UI:** Efek *Cursor Glow* dan *Typing Animation* yang mengikuti pergerakan mouse.
- **Fullstack Integration:** Memiliki backend yang dapat menerima dan menyimpan pesan dari pengunjung secara real-time.
- **Database:** Menggunakan `nedb-promises` (Database berbasis JSON) yang ringan dan kompatibel dengan lingkungan cloud/serverless.
- **Responsive Design:** Tampilan yang dioptimalkan untuk berbagai ukuran layar (Laptop, Tablet, dan Mobile).
- **Clean Code:** Struktur kode yang rapi menggunakan standar HTML5, CSS3, dan Node.js.

##  Tech Stack
Website ini dibangun menggunakan teknologi:

| Layer | Teknologi |
| :--- | :--- |
| **Frontend** | HTML, CSS, JavaScript (Vanilla) |
| **Backend** | Node.js & Express.js |
| **Database** | NeDB (nedb-promises) |
| **Hosting** | Vercel |

##  Struktur Folder
```text
portfolio-project/
├── css/             # File styling (style.css)
├── js/              # Logika frontend (main.js)
├── index.html       # Halaman utama
├── server.js        # Mesin backend (Node.js)
├── package.json     # Daftar library yang digunakan
├── package-lock.json# Catatan versi library secara detail (Locked)
├── vercel.json      # Konfigurasi deployment untuk Vercel
├── messages.db      # File database (otomatis terbuat)
└── Photos.jpeg      # Foto
```

---

##  Cara Menjalankan di Lokal

1. **Clone repository ini:**
```bash
   git clone https://github.com/fitri-hub/Portfolio-fitri.git
```

2. **Masuk ke folder project:**
```bash
   cd Portfolio-fitri
```

3. **Install library yang dibutuhkan:**
```bash
   npm install
```

4. **Jalankan server:**
```bash
   node server.js
```

5. **Buka di browser:**
http://localhost:3000

---

## 📩 Fitur Kontak (Backend)

Pengunjung dapat mengirimkan pesan melalui form kontak. Data dikirimkan ke endpoint `/api/messages` menggunakan metode `POST` dan disimpan ke dalam database `messages.db`.

| Method | Endpoint | Fungsi |
|--------|----------|--------|
| `POST` | `/api/messages` | Menyimpan pesan dari pengunjung |
| `GET` | `/api/messages` | Melihat semua pesan (admin) |

---

## 👤 Profil Penulis

| | |
|---|---|
| **Nama** | Fitriani |
| **NIM** | 2408107010022 |
| **Prodi** | Informatika |
| **Universitas** | Universitas Syiah Kuala |
