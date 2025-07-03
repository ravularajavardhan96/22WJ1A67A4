
const express = require('express');
const { nanoid } = require('nanoid');
const app = express();
const PORT = 3000;

app.use(express.json());

const urlDatabase = {}; // In-memory store

// Shorten URL
app.post('/shorten', (req, res) => {
    const { originalUrl } = req.body;
    if (!originalUrl) return res.status(400).json({ error: 'URL is required' });

    const shortCode = nanoid(6);
    urlDatabase[shortCode] = originalUrl;

    res.json({ shortUrl: `http://localhost:${PORT}/${shortCode}` });
});

// Redirect to original URL
app.get('/:code', (req, res) => {
    const originalUrl = urlDatabase[req.params.code];
    if (originalUrl) {
        res.redirect(originalUrl);
    } else {
        res.status(404).send('URL not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
