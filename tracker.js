// Email open tracking server
// Usage: node tracker.js
// Requires TRACKER_PORT in .env (default 4243)
// Needs a public URL — use ngrok locally: ngrok http 4243
// Then set TRACKER_URL=https://xxxx.ngrok.io in .env

const http = require('http');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const PORT = process.env.TRACKER_PORT || 4243;
const LOG_FILE = path.join(__dirname, 'newsletter-log.json');

// Minimal 1×1 transparent GIF
const PIXEL = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  'base64'
);

function loadLog() {
  if (!fs.existsSync(LOG_FILE)) return {};
  try { return JSON.parse(fs.readFileSync(LOG_FILE, 'utf8')); } catch { return {}; }
}
function saveLog(log) {
  fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));
}

const server = http.createServer((req, res) => {
  // GET /open/:newsletterId/:userId.gif
  const openMatch = req.url.match(/^\/open\/([^/]+)\/([^/]+)\.gif$/);
  if (openMatch && req.method === 'GET') {
    const [, newsletterId, userId] = openMatch;

    const log = loadLog();
    const campaign = log[newsletterId];
    if (campaign) {
      const recipient = campaign.recipients.find(r => r.userId === userId);
      if (recipient && !recipient.openedAt) {
        recipient.openedAt = new Date().toISOString();
        saveLog(log);
        console.log(`[open] ${newsletterId} · ${recipient.email || userId} · ${recipient.openedAt}`);
      }
    }

    res.writeHead(200, {
      'Content-Type': 'image/gif',
      'Content-Length': PIXEL.length,
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
    });
    res.end(PIXEL);
    return;
  }

  // GET /stats — open rate summary
  if (req.url === '/stats' && req.method === 'GET') {
    const log = loadLog();
    const stats = Object.entries(log).map(([id, campaign]) => {
      const total = campaign.recipients.length;
      const opened = campaign.recipients.filter(r => r.openedAt).length;
      return {
        campaign: id,
        sentAt: campaign.sentAt,
        sent: total,
        opened,
        openRate: total > 0 ? ((opened / total) * 100).toFixed(1) + '%' : '0%',
        recipients: campaign.recipients.map(r => ({
          name: r.name,
          email: r.email,
          sentAt: r.sentAt,
          openedAt: r.openedAt || null,
        })),
      };
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(stats, null, 2));
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`\n  Tracking server running on port ${PORT}`);
  console.log(`  Open pixel: http://localhost:${PORT}/open/:campaignId/:userId.gif`);
  console.log(`  Stats:      http://localhost:${PORT}/stats`);
  console.log('\n  To make it public, run:');
  console.log(`    ngrok http ${PORT}`);
  console.log('  Then set TRACKER_URL=https://xxxx.ngrok.io in .env\n');
});
