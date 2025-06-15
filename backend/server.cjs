require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/auth/google', async (req, res) => {
  const { code } = req.body;
  try {
    const params = new URLSearchParams();
    params.append('code', code);
    params.append('client_id', process.env.GOOGLE_CLIENT_ID);
    params.append('client_secret', process.env.GOOGLE_CLIENT_SECRET);
    params.append('redirect_uri', process.env.GOOGLE_REDIRECT_URI);
    params.append('grant_type', 'authorization_code');

    const response = await axios.post('https://oauth2.googleapis.com/token', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    res.json(response.data); // Contains access_token, id_token, etc.
  } catch (error) {
  console.error("OAuth Error:", error.response?.data || error.message);
  res.status(500).json({ error: "OAuth failed" });
}
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Auth server running on port ${PORT}`));
