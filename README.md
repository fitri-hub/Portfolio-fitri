#  Personal Portfolio - Fitriani

 Website ini dibuat untuk memenuhi tugas UTS Praktikum Pemrograman Berbasis Web (PBW). Website ini bersifat **Fullstack**, interaktif, dan responsif.

---

##  Fitur Utama

- **Interaktif UI:** Efek *Cursor Glow* dan *Typing Animation* yang mengikuti pergerakan mouse.
- **Fullstack Integration:** Memiliki backend yang dapat menerima dan menyimpan pesan dari pengunjung.
- **Database:** Menggunakan `better-sqlite3` untuk penyimpanan data pesan secara lokal.
- **Responsive Design:** Tampilan yang nyaman dilihat baik di laptop maupun perangkat mobile.
- **Clean Code:** Struktur kode yang rapi menggunakan HTML5, CSS3, dan Node.js.

---

##  Tech Stack

Website ini dibangun menggunakan teknologi:

| Layer | Teknologi |
|-------|-----------|
| **Frontend** | HTML, CSS, JavaScript (Vanilla) |
| **Backend** | Node.js & Express.js |
| **Database** | SQLite (via better-sqlite3) |
| **Hosting** | Railway / Render |

---

## 📂 Struktur Folder

```text
portfolio-project/
├── css/
│   └── style.css        # File styling
├── js/
│   └── main.js          # Logika frontend
├── index.html           # Halaman utama
├── server.js            # Backend Node.js
├── package.json         # Konfigurasi dependencies
├── messages.db          # Database (otomatis terbuat)
└── photos.jpeg          # Foto
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

##  Fitur Kontak (Backend)

Pengunjung dapat mengirimkan pesan melalui form kontak. Data dikirimkan ke endpoint `/api/messages` menggunakan metode `POST` dan disimpan ke dalam database `messages.db`.

| Method | Endpoint | Fungsi |
|--------|----------|--------|
| `POST` | `/api/messages` | Menyimpan pesan dari pengunjung |
| `GET` | `/api/messages` | Melihat semua pesan (admin) |

---

##  Profil Penulis

| | |
|---|---|
| **Nama** | Fitriani |
| **NIM** | 2408107010022 |
| **Prodi** | Informatika |
| **Universitas** | Universitas Syiah Kuala |

---
