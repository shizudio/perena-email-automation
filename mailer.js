require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function sendEmail({ to, cc, subject, html, text, attachments = [] }) {
  const info = await transporter.sendMail({
    from: `"Shina" <${process.env.GMAIL_USER}>`,
    to,
    ...(cc ? { cc } : {}),
    subject,
    html,
    text,
    attachments,
  });
  console.log(`[${new Date().toISOString()}] Email sent to ${to} — MessageId: ${info.messageId}`);
  return info;
}

module.exports = { sendEmail };
