const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const authMiddleware = require('../middleware/auth');

// All these routes should be protected — use auth middleware

// Create Playlist
router.post('/', authMiddleware, playlistController.createPlaylist);

// Add Song to Playlist
router.post('/:playlistId/songs/:songId', authMiddleware, playlistController.addSongToPlaylist);

router.delete('/:playlistId/songs/:songId', authMiddleware, playlistController.removeSongFromPlaylist);

// Get User's Playlists
router.get('/me', authMiddleware, playlistController.getUserPlaylists);

router.get('/:id', authMiddleware, playlistController.getPlaylistById);

// Delete Playlist
router.delete('/:id', authMiddleware, playlistController.deletePlaylist);


module.exports = router;
