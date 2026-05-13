function welcomeTemplate({ name, inviteLink = 'https://t.me/+xvFYGruiWfhiOTU1' }) {
  return {
    subject: `Welcome to Purple, ${name} 💜`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:'Georgia',serif;color:#1a1a1a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;">
    <tr>
      <td style="padding:40px 40px 0 40px;">
        <p style="font-size:16px;line-height:1.7;margin:0 0 16px;">Hi ${name},</p>

        <p style="font-size:16px;line-height:1.7;margin:0 0 16px;">
          Shina here from Perena. Welcome to Purple — genuinely glad to have you in.
        </p>

        <p style="font-size:16px;line-height:1.7;margin:0 0 16px;">
          I wanted to reach out personally because we just launched a private Telegram group
          for Purple members. It's small, invite-only, and designed to be the closest line
          between you and the team building the product your capital is in.
        </p>

        <p style="font-size:16px;line-height:1.7;margin:0 0 8px;font-weight:bold;">What happens in there:</p>
        <p style="font-size:16px;line-height:1.9;margin:0 0 16px;">
          → Product updates, new features, and strategy thinking before it goes public<br/>
          → Our investment philosophy — how we construct yield, how we manage risk, and why we make the decisions we do<br/>
          → Your feedback on the Purple portal and product roadmap goes directly to our product team
        </p>

        <p style="font-size:16px;line-height:1.7;margin:0 0 24px;">
          We're intentionally starting with a small founding group — the people whose
          perspective we trust most to help shape what Purple becomes. If you have not done
          so already:
        </p>

        <!-- CTA buttons -->
        <table cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding-right:12px;">
              <a href="${inviteLink}"
                style="display:inline-block;background:#6134CD;color:#ffffff;text-decoration:none;
                       padding:12px 24px;border-radius:6px;font-family:Arial,sans-serif;
                       font-size:15px;font-weight:bold;">
                Here's your invite link
              </a>
            </td>
            <td>
              <a href="https://cal.com/perena"
                style="display:inline-block;background:#ffffff;color:#6134CD;text-decoration:none;
                       padding:12px 24px;border-radius:6px;font-family:Arial,sans-serif;
                       font-size:15px;font-weight:bold;border:1.5px solid #6134CD;">
                Book a coffee chat with Anna ☕
              </a>
            </td>
          </tr>
        </table>

        <p style="font-size:16px;line-height:1.7;margin:32px 0 0;">
          Would love to have you in the room.
        </p>
      </td>
    </tr>

    <!-- Sign-off -->
    <tr>
      <td style="padding:32px 40px 24px 40px;border-top:1px solid #f0e8ff;margin-top:32px;">
        <p style="font-size:15px;line-height:1.8;margin:0;color:#444;">
          🪻 <strong>Shina</strong><br/>
          💜 <a href="https://x.com/perena" style="color:#6134CD;text-decoration:none;">Follow our journey on X</a>
        </p>
      </td>
    </tr>

    <!-- Banner image -->
    <tr>
      <td style="padding:0;">
        <img src="cid:banner" alt="Perena – Where Money Grows" width="300"
          style="width:50%;display:block;border-radius:0 0 8px 8px;" />
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim(),
    attachments: [
      {
        filename: 'banner.jpg',
        path: __dirname + '/../assets/email sign off banner.jpg',
        cid: 'banner',
      },
    ],
  };
}

module.exports = { welcomeTemplate };
