const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const app = express();

app.use(cors());

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('Missing url parameter');

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'text/html,application/xhtml+xml'
      }
    });

    const contentType = response.headers.get('content-type');
    if (!contentType.includes('text/html')) {
      return res.status(415).send('Unsupported content type');
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove CSP headers
    $('meta[http-equiv="Content-Security-Policy"]').remove();

    // Rewrite all links and forms
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href');
      if (href && !href.startsWith('javascript:')) {
        $(el).attr('href', `/proxy?url=${encodeURIComponent(new URL(href, targetUrl).href)}`);
      }
    });

    $('form[action]').each((_, el) => {
      const action = $(el).attr('action');
      if (action) {
        $(el).attr('action', `/proxy?url=${encodeURIComponent(new URL(action, targetUrl).href)}`);
      }
    });

    res.setHeader('Content-Type', 'text/html');
    res.send($.html());
  } catch (err) {
    res.status(500).send(`Proxy error: ${err.message}`);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
