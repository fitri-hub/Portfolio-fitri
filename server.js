const express = require('express');
const Datastore = require('nedb-promises');
const path = require('path');
const cors = require('cors');

const app = express();

// Konfigurasi Database (Gunakan /tmp agar bisa menulis file di Vercel)
const db = Datastore.create({ 
  filename: path.join('/tmp', 'messages.db'), 
  autoload: true 
});

app.use(cors());
app.use(express.json());

/**
 * 1. PENGATURAN FILE STATIS (CSS, JS, IMAGES)
 * Ini harus di atas rute API agar file style.css dan gambar bisa dimuat
 */
app.use(express.static(path.join(__dirname)));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/mine.jpeg', express.static(path.join(__dirname, 'mine.jpeg')));
app.use('/photos.jpeg', express.static(path.join(__dirname, 'photos.jpeg')));
app.use('/photo2.jpeg', express.static(path.join(__dirname, 'photo2.jpeg')));
app.use('/photo3.jpeg', express.static(path.join(__dirname, 'photo3.jpeg')));

/**
 * 2. API ROUTES
 */

// Ambil semua pesan
app.get('/api/messages', async (req, res) => {
  try {
    const docs = await db.find({}).sort({ created_at: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data' });
  }
});

// Simpan pesan baru
app.post('/api/messages', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Mohon isi semua data ya!' });
  }

  try {
    const newDoc = await db.insert({ 
      name: name.trim(), 
      email: email.trim(), 
      message: message.trim(), 
      created_at: new Date() 
    });
    
    res.status(201).json({ 
      success: true, 
      message: 'Pesan berhasil terkirim!',
      id: newDoc._id 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal menyimpan pesan.' });
  }
});

/**
 * 3. FALLBACK ROUTE
 * Jika alamat tidak ditemukan, tampilkan halaman utama
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server aktif di port ${PORT}`);
});
