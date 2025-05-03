const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Refresh Token
router.get('/refresh', authController.refreshToken);

// Logout
router.post('/logout', authController.logout);

module.exports = router;
