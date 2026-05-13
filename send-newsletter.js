// Usage: node send-newsletter.js
// Set NEWSLETTER below to the newsletter you want to send

const { getVipUsers } = require('./db');
const { sendEmail } = require('./mailer');
const fs = require('fs');
const path = require('path');

// ── CONFIGURE EACH SEND ──────────────────────────────────────────────────────
const { usdStarNewsletter } = require('./newsletters/2026-03-usdstar');
const NEWSLETTER_ID = '2026-03-usdstar';        // unique ID for this send
const getTemplate = (opts) => usdStarNewsletter(opts);
const TRACKING_BASE_URL = process.env.TRACKER_URL || ''; // set TRACKER_URL in .env
// ─────────────────────────────────────────────────────────────────────────────

const LOG_FILE = path.join(__dirname, 'newsletter-log.json');

function loadLog() {
  if (!fs.existsSync(LOG_FILE)) return {};
  try { return JSON.parse(fs.readFileSync(LOG_FILE, 'utf8')); } catch { return {}; }
}
function saveLog(log) { fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2)); }

async function run() {
  const log = loadLog();
  if (!log[NEWSLETTER_ID]) log[NEWSLETTER_ID] = { sentAt: null, recipients: [] };

  const users = await getVipUsers();
  const targets = users.filter(u => u.email);

  const alreadySentIds = new Set(log[NEWSLETTER_ID].recipients.map(r => r.userId));
  const pending = targets.filter(u => !alreadySentIds.has(u._id));

  if (pending.length === 0) {
    console.log(`[${NEWSLETTER_ID}] All users already received this newsletter.`);
    process.exit(0);
  }

  console.log(`Sending "${NEWSLETTER_ID}" to ${pending.length} user(s)...`);
  log[NEWSLETTER_ID].sentAt = log[NEWSLETTER_ID].sentAt || new Date().toISOString();

  for (const user of pending) {
    const trackingPixelUrl = TRACKING_BASE_URL
      ? `${TRACKING_BASE_URL}/open/${NEWSLETTER_ID}/${user._id}.gif`
      : '';

    const { subject, html, attachments } = getTemplate({ trackingPixelUrl });
    await sendEmail({ to: user.email, subject, html, attachments });

    log[NEWSLETTER_ID].recipients.push({
      userId: user._id,
      name: user.name,
      email: user.email,
      sentAt: new Date().toISOString(),
      openedAt: null,
    });

    saveLog(log); // save after each send so a crash doesn't re-send
    console.log(`  ✓ ${user.email}`);
  }

  const total = log[NEWSLETTER_ID].recipients.length;
  console.log(`\nDone. ${total} total sent for "${NEWSLETTER_ID}".`);
  process.exit(0);
}

run().catch(err => { console.error('Error:', err.message); process.exit(1); });
