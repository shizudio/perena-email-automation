const { sendEmail } = require('../mailer');
const { welcomeTemplate } = require('../templates/welcome');
const { welcomeAxasTemplate } = require('../templates/welcome-axas');
const { getVipUsers } = require('../db');
const { alreadySent, markSent } = require('../sent-log');

// Triggers welcome email for newly approved users (status: "active") not yet emailed.
// Axas members (tier: "axas") must exist in the DB and be active — same requirement as
// regular members, just routed to a different template (no Telegram invite).
async function runSignupEmails() {
  const users = await getVipUsers();
  const newUsers = users.filter(u => u.status === 'active' && u.email && !alreadySent(u._id, 'welcome'));

  for (const user of newUsers) {
    const template = user.tier === 'axas' ? welcomeAxasTemplate : welcomeTemplate;
    const { subject, html, attachments } = template({ name: user.name });
    await sendEmail({ to: user.email, subject, html, attachments });
    markSent(user._id, 'welcome');
    console.log(`[onSignup] Welcome email sent to ${user.email} (${user.name}) [tier: ${user.tier || 'standard'}]`);
  }

  if (newUsers.length === 0) {
    console.log('[onSignup] No new users to email.');
  }
}

module.exports = { runSignupEmails };
