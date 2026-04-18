const express = require('express');
const Datastore = require('nedb-promises');
const path = require('path');
const cors = require('cors');

const app = express();

// Konfigurasi Database
// Gunakan /tmp untuk Vercel agar database bisa ditulis di lingkungan serverless
const db = Datastore.create({ 
  filename: path.join('/tmp', 'messages.db'), 
  autoload: true 
});

app.use(cors());
app.use(express.json());

// 1. API untuk mengambil pesan (GET)
// Ditaruh di atas agar tidak tertutup oleh express.static
app.get('/api/messages', async (req, res) => {
  try {
    const docs = await db.find({}).sort({ created_at: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data' });
  }
});

// 2. API untuk menyimpan pesan (POST)
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

// 3. Melayani file statis 
app.use(express.static(path.join(__dirname)));

// 4. Route cadangan untuk mengarahkan semua ke index.html (SPA Friendly)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Port untuk Vercel atau Lokal
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
