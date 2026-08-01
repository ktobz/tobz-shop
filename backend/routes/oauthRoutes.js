const express = require('express');
const router = express.Router();
const { googleRedirect, googleCallback } = require('../controllers/googleOAuthController');

router.get('/google', googleRedirect);
router.get('/google/callback', googleCallback);

module.exports = router;
