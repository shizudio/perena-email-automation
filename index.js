const cron = require('node-cron');
const { runSignupEmails } = require('./triggers/onSignup');
const { runLowDepositEmails } = require('./triggers/onLowDeposit');

// Check for new signups every 15 minutes
cron.schedule('*/15 * * * *', async () => {
  console.log(`[${new Date().toISOString()}] Checking for new signups...`);
  try {
    await runSignupEmails();
  } catch (err) {
    console.error('[onSignup] Error:', err.message);
  }
});

// Check for low deposit users every day at 9:00 AM (Asia/Shanghai)
cron.schedule('0 9 * * *', async () => {
  console.log(`[${new Date().toISOString()}] Checking low deposit users...`);
  try {
    await runLowDepositEmails();
  } catch (err) {
    console.error('[onLowDeposit] Error:', err.message);
  }
}, {
  timezone: 'Asia/Shanghai',
});

console.log('Email automation started.');
console.log('  → Signup welcome emails: every 15 minutes');
console.log('  → Low deposit reminders: daily at 9:00 AM (Asia/Shanghai)');
