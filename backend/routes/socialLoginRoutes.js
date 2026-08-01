const express = require('express');
const router = express.Router();
const { socialLogin } = require('../controllers/socialLoginController');

router.post('/social-login', socialLogin);

module.exports = router;
