const { sendEmail } = require('./mailer');
const { welcomeTemplate } = require('./templates/welcome');
const { expiryTemplate } = require('./templates/expiry');

async function runTests() {
  // 1. Welcome email
  const welcome = welcomeTemplate({ name: 'Shina' });
  await sendEmail({ to: 'shina@perena.org', ...welcome });
  await sendEmail({ to: 'luke@perena.org', ...welcome });
  console.log('✓ Welcome email sent');

  // 2. Expiry reminder email
  const expiry = expiryTemplate({ name: 'Shina' });
  await sendEmail({ to: 'shina@perena.org', ...expiry });
  await sendEmail({ to: 'luke@perena.org', ...expiry });
  console.log('✓ Expiry email sent');
}

runTests().catch(err => console.error('Test failed:', err.message));
