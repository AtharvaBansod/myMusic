const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const upload = require('../utils/multer'); // Configure multer for file uploads
// const auth = require('../utils/auth');

router.post('/', upload.single('audio'), songController.uploadSong);
router.get('/:id', songController.getSong);
router.get('/', songController.getAllSongs);

module.exports = router;