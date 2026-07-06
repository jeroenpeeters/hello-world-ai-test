const http = require('http');
const { URL } = require('url');

const port = process.env.PORT || 3000;

const EMOJIS = ['😀', '🎉', '🚀', '🌟', '🐙', '🍕', '🌈', '🔥', '🐢', '🎈'];

function randomEmoji() {
  return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const server = http.createServer((req, res) => {
  const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);
  if (pathname === '/') {
    const name = searchParams.get('name');
    const message = `${name ? `Hello World, ${escapeHtml(name)}` : 'Hello World'} ${randomEmoji()}`;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<h1>${message}</h1>`);
    return;
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(port, () => {
  console.log(`listening on :${port}`);
});
