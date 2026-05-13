const { sendEmail } = require('../mailer');
const { expiryTemplate } = require('../templates/expiry');
const { getVipUsers } = require('../db');
const { alreadySent, markSent } = require('../sent-log');

const THRESHOLD = 100_000;

// Triggers expiry reminder for approved users whose lastBalance dropped below $100K
async function runLowDepositEmails() {
  const users = await getVipUsers();
  const lowUsers = users.filter(u =>
    u.status === 'active' &&
    u.email &&
    u.lastBalance !== null &&
    u.lastBalance < THRESHOLD &&
    !alreadySent(u._id, 'expiry')
  );

  for (const user of lowUsers) {
    const { subject, html, attachments } = expiryTemplate({ name: user.name });
    await sendEmail({ to: user.email, subject, html, attachments });
    markSent(user._id, 'expiry');
    console.log(`[onLowDeposit] Expiry email sent to ${user.email} — balance: $${user.lastBalance?.toLocaleString()}`);
  }

  if (lowUsers.length === 0) {
    console.log('[onLowDeposit] No users below threshold.');
  }
}

module.exports = { runLowDepositEmails };
