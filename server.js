const express = require('express');
const Datastore = require('nedb-promises');
const path = require('path');
const cors = require('cors');

const app = express();
// Database akan otomatis terbuat sebagai file messages.db
const db = Datastore.create({ filename: 'messages.db', autoload: true });

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// API untuk menyimpan pesan
app.post('/api/messages', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'Data tidak lengkap' });
  
  try {
    const newDoc = await db.insert({ name, email, message, created_at: new Date() });
    res.status(201).json({ success: true, id: newDoc._id });
  } catch (err) {
    res.status(500).json({ error: 'Gagal menyimpan' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server aman di http://localhost:${PORT}`));