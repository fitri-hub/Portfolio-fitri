const express = require('express');
const Datastore = require('nedb-promises');
const path = require('path');
const cors = require('cors');

const app = express();

// Database akan otomatis terbuat sebagai file messages.db di folder root
// Di Vercel, file ini bersifat temporary (sementara)
const db = Datastore.create({ 
  filename: path.join(__dirname, 'messages.db'), 
  autoload: true 
});

app.use(cors());
app.use(express.json());

// Melayani file statis (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// API untuk menyimpan pesan dari form kontak
app.post('/api/messages', async (req, res) => {
  const { name, email, message } = req.body;

  // Validasi sederhana
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
    res.status(500).json({ error: 'Yah, gagal menyimpan pesan. Coba lagi nanti ya.' });
  }
});

app.get('/api/messages', async (req, res) => {
  try {
    const docs = await db.find({});
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data' });
  }
});

// Route cadangan untuk mengarahkan semua ke index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan mulus di http://localhost:${PORT}`);
});
