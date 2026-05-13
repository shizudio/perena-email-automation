# Perena Email Automation

Automated trigger emails and newsletter system for Perena Purple — a VIP membership tier for high-value DeFi depositors.

Built and maintained by [Shina](https://shizudio.me).

---

## What it does

### Triggered emails (run automatically)

| Trigger | Frequency | Template |
|---------|-----------|----------|
| New Purple member approved | Every 15 min | `templates/welcome.js` |
| New Mythical Axas member approved | Every 15 min | `templates/welcome-axas.js` |
| Member balance drops below $100K | Daily 9 AM SGT | `templates/expiry.js` |

- Duplicate-safe — each email sends once per user, tracked in `sent-log.json`
- Mythical Axas members get a tailored welcome (no Telegram invite) routed via `tier` field in MongoDB

### Newsletters (sent manually)
- One file per campaign in `newsletters/`
- Safe to re-run — skips already-sent recipients
- Open rate tracking via 1×1 pixel (`tracker.js`)

---

## Stack

- **Node.js** — no framework
- **nodemailer** — Gmail SMTP
- **mongodb** — reads from `perena.vipusers` collection
- **node-cron** — scheduler

---

## Setup

```bash
npm install
cp .env.example .env
# Fill in GMAIL_USER, GMAIL_APP_PASSWORD, MONGO_URI
node test.js       # sends preview emails to yourself
node index.js      # starts the cron scheduler
```

### Run persistently with PM2
```bash
pm2 start index.js --name perena-email
pm2 save
```

---

## Folder structure

```
├── templates/
│   ├── welcome.js          # Standard Purple welcome
│   ├── welcome-axas.js     # Mythical Axas welcome (no Telegram)
│   └── expiry.js           # Low deposit reminder
├── triggers/
│   ├── onSignup.js         # Fires on new active users
│   └── onLowDeposit.js     # Fires when balance < $100K
├── newsletters/            # Manual campaign files
├── assets/                 # Embedded email images
├── db.js                   # MongoDB query
├── mailer.js               # SMTP transport
├── sent-log.js             # Read/write sent-log.json
├── tracker.js              # Open rate pixel server
├── index.js                # Cron scheduler entry point
└── test.js                 # Preview emails to yourself
```
