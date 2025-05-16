// First, let's create a basic Express server to handle the Spotify API authentication
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8888;

app.use(cors());
app.use(express.json());

// Spotify API credentials - store these in .env file
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
// Use explicit loopback address instead of localhost
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const FRONTEND_URI = `http://127.0.0.1:3000`;

// Generate a random string for state parameter
const generateRandomString = length => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// Login route - redirect to Spotify authorization page
app.get('/login', (req, res) => {
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email user-top-read user-follow-read playlist-read-private user-read-recently-played';

  const queryParams = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    state,
    scope,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

// Callback route - handle the response from Spotify authorization
app.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect(`/#${new URLSearchParams({ error: 'state_mismatch' })}`);
    return;
  }

  try {
    // Exchange the authorization code for an access token
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      },
    });

    const { access_token, refresh_token, expires_in } = response.data;

    // Redirect to the frontend with tokens as params
    const queryParams = new URLSearchParams({
      access_token,
      refresh_token,
      expires_in,
    });

    res.redirect(`${FRONTEND_URI}/?${queryParams}`);
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    res.redirect(`${FRONTEND_URI}/#${new URLSearchParams({ error: 'invalid_token' })}`);
  }
});

// Refresh token route
app.post('/refresh_token', async (req, res) => {
  const { refresh_token } = req.body;

  try {
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).send('Error refreshing token');
  }
});

// API endpoints

// Get user profile
app.get('/api/me', async (req, res) => {
  const { access_token } = req.query;

  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).send('Error fetching user profile');
  }
});

// Get user's top artists
app.get('/api/top-artists', async (req, res) => {
  const { access_token, time_range = 'medium_term', limit = 20, offset = 0 } = req.query;

  try {
    const response = await axios.get(`https://api.spotify.com/v1/me/top/artists`, {
      headers: { Authorization: `Bearer ${access_token}` },
      params: { time_range, limit, offset },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching top artists:', error);
    res.status(500).send('Error fetching top artists');
  }
});

// Get user's top tracks
app.get('/api/top-tracks', async (req, res) => {
  const { access_token, time_range = 'medium_term', limit = 20, offset = 0 } = req.query;

  try {
    const response = await axios.get(`https://api.spotify.com/v1/me/top/tracks`, {
      headers: { Authorization: `Bearer ${access_token}` },
      params: { time_range, limit, offset },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    res.status(500).send('Error fetching top tracks');
  }
});

// Get user's playlists
app.get('/api/playlists', async (req, res) => {
  const { access_token, limit = 20, offset = 0 } = req.query;

  try {
    const response = await axios.get(`https://api.spotify.com/v1/me/playlists`, {
      headers: { Authorization: `Bearer ${access_token}` },
      params: { limit, offset },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching playlists:', error);
    res.status(500).send('Error fetching playlists');
  }
});

// Get user's recently played
app.get('/api/recently-played', async (req, res) => {
  const { access_token, limit = 20, before, after } = req.query;

  try {
    const params = { limit };
    if (before) params.before = before;
    if (after) params.after = after;

    const response = await axios.get(`https://api.spotify.com/v1/me/player/recently-played`, {
      headers: { Authorization: `Bearer ${access_token}` },
      params,
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching recently played:', error);
    res.status(500).send('Error fetching recently played');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://127.0.0.1:${PORT}`);
});