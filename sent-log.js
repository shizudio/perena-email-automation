const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, 'sent-log.json');

function loadLog() {
  if (!fs.existsSync(LOG_FILE)) return {};
  try { return JSON.parse(fs.readFileSync(LOG_FILE, 'utf8')); } catch { return {}; }
}

function saveLog(log) {
  fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));
}

// Returns true if this email type was already sent to this userId
function alreadySent(userId, type) {
  const log = loadLog();
  return !!(log[userId] && log[userId][type]);
}

// Marks an email type as sent for this userId
function markSent(userId, type) {
  const log = loadLog();
  if (!log[userId]) log[userId] = {};
  log[userId][type] = new Date().toISOString();
  saveLog(log);
}

module.exports = { alreadySent, markSent };
