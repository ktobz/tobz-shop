const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * POST /api/auth/google
 * Exchange Google credential for JWT
 */
const googleSignIn = async (req, res, next) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        status: 'error',
        message: 'Google credential is required.'
      });
    }

    // Verify the Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    if (!email) {
      return res.status(400).json({
        status: 'error',
        message: 'Google account does not have an email address.'
      });
    }

    // Find or create user
    let user = await User.findOne({ where: { email } });

    if (!user) {
      // Create new user from Google data
      user = await User.create({
        username: name || email.split('@')[0],
        email,
        googleId,
        provider: 'google',
        role: 'user'
      });
    } else if (!user.googleId) {
      // Link Google account to existing user
      user.googleId = googleId;
      user.provider = user.provider || 'google';
      await user.save();
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    return res.status(200).json({
      status: 'success',
      token,
      user: userResponse
    });
  } catch (err) {
    if (err.message && err.message.includes('Wrong number of segments')) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid Google credential.'
      });
    }
    next(err);
  }
};

module.exports = { googleSignIn };
