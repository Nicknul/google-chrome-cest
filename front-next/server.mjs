import https from 'https';
import { parse } from 'url';
import next from 'next';
import fs from 'fs';
import path from 'path';

const dev = process.env.NODE_ENV !== 'production';
const hostname = '192.168.219.188';
const port = 3000;

// Load HTTPS certificates
const httpsOptions = {
  key: fs.readFileSync(path.join(process.cwd(), '192.168.219.188+3-key.pem')),
  cert: fs.readFileSync(path.join(process.cwd(), '192.168.219.188+3.pem')),
};

// Initialize Next.js
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  https
    .createServer(httpsOptions, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on https://${hostname}:${port}`);
    });
});
