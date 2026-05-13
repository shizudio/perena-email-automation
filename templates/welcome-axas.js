function welcomeAxasTemplate({ name }) {
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
          Shina here from Perena. Welcome to Purple — and honestly, this one feels earned.
        </p>

        <p style="font-size:16px;line-height:1.7;margin:0 0 16px;">
          You're coming in as one of the top performers on the Mythical Axas leaderboard,
          which means you already know how this ecosystem works better than most.
          We wanted to make sure you had a home here that reflects that.
        </p>

        <p style="font-size:16px;line-height:1.7;margin:0 0 8px;font-weight:bold;">What Purple gives you:</p>
        <p style="font-size:16px;line-height:1.9;margin:0 0 16px;">
          → Early access to product updates and new features before they go public<br/>
          → A direct line to the team — your feedback on the Purple portal goes straight to product<br/>
          → Insider context on how we construct yield, manage risk, and make strategic decisions
        </p>

        <p style="font-size:16px;line-height:1.7;margin:0 0 24px;">
          If you'd like to chat with Perena's founder Anna, below is the link to book a time!
          We would love to hear how you're thinking about on-chain yield right now, and share
          what we're building next.
        </p>

        <!-- CTA button -->
        <table cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <a href="https://cal.com/perena"
                style="display:inline-block;background:#6134CD;color:#ffffff;text-decoration:none;
                       padding:12px 24px;border-radius:6px;font-family:Arial,sans-serif;
                       font-size:15px;font-weight:bold;">
                Book a coffee chat with Anna ☕
              </a>
            </td>
          </tr>
        </table>

        <p style="font-size:16px;line-height:1.7;margin:32px 0 0;">
          Really glad to have you in.
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

module.exports = { welcomeAxasTemplate };
