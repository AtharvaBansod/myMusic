require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const songRoutes = require('./routes/songRoutes');
// const userRoutes = require('./routes/userRoutes');
// const errorHandler = require('./middleware/errorHandler');

const fs = require('fs');
const path = require('path');

// Ensure temp directory exists
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

const app = express();

// Middleware
app.use(cors({
    origin: 'https://my-music-psi.vercel.app/', // Your frontend URL
    credentials: true,               // Allow cookies/credentials
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/songs', songRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling
// app.use(errorHandler);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

module.exports = app;
