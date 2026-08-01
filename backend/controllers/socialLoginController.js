require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

/**
 * POST /api/auth/social-login
 * Exchange Supabase session token for app JWT
 */
const socialLogin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Missing Supabase session token.',
      });
    }

    // Verify the Supabase token by calling Supabase API
    const verifyRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { Authorization: `Bearer ${token}`, apikey: supabaseAnonKey },
    });

    if (!verifyRes.ok) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid Supabase session.',
      });
    }

    const su = await verifyRes.json();
    const email = su.email?.toLowerCase();
    const name = su.user_metadata?.full_name || su.user_metadata?.name || email.split('@')[0];

    if (!email) {
      return res.status(400).json({
        status: 'error',
        message: 'No email associated with this account.',
      });
    }

    // Find or create user
    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({
        username: name,
        email,
        googleId: su.id,
        provider: 'google',
        role: 'user',
      });
    } else if (!user.googleId) {
      user.googleId = su.id;
      user.provider = user.provider || 'google';
      await user.save();
    }

    // Generate JWT
    const appToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    return res.status(200).json({
      status: 'success',
      token: appToken,
      user: userResponse,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { socialLogin };
