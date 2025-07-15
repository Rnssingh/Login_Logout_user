require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
const MONGO_URL = process.env.MONGO_URI;
mongoose.connect(MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ DB Error:", err));

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => {
  console.log(`✅ Server listening on PORT:${PORT}`);
});
