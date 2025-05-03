const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  duration: { type: Number, required: true },
  genre: { type: String },
  cloudinaryId: { type: String, required: true },
  url: { type: String, required: true }, // CDN URL from Cloudinary
  uploadDate: { type: Date, default: Date.now },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Song', songSchema);