const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const Song = require('../models/song');

// Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

exports.uploadSong = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Validate required fields
        const { title, artist, duration } = req.body;
        if (!title || !artist || !duration) {
            // Clean up the uploaded file if validation fails
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ 
                message: 'All fields (title, artist, duration) are required' 
            });
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'video',
            folder: 'music-app'
        });

        // Delete the temp file
        fs.unlinkSync(req.file.path);

        // Create song record
        const song = new Song({
            title: req.body.title,
            artist: req.body.artist,
            duration: Number(req.body.duration), // Convert to number
            genre: req.body.genre,
            cloudinaryId: result.public_id,
            url: result.secure_url,
            userId: req.userId
        });

        await song.save();
        res.status(201).json(song);
    } catch (error) {
        // Clean up file if error occurs
        if (req.file) fs.unlinkSync(req.file.path);
        res.status(500).json({ message: error.message });
    }
};
exports.getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find().select('-cloudinaryId');
        if (songs.length == 0) return res.status(404).json({ message: 'No songs to play' });
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSong = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id).select('-cloudinaryId');
        if (!song) return res.status(404).json({ message: 'Song not found' });
        res.json(song);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
