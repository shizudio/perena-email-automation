function expiryTemplate({ name }) {
  return {
    subject: `A note on your Purple membership, ${name}`,
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
          Shina here — just a gentle heads up from my end.
        </p>

        <p style="font-size:16px;line-height:1.7;margin:0 0 16px;">
          We noticed your deposit has dipped below the <strong>$100,000 USD</strong> mark.
          I wanted to let you know personally before anything changes on your account.
        </p>

        <p style="font-size:16px;line-height:1.7;margin:0 0 16px;">
          You have <strong>7 days</strong> to restore your position to $100K USD or above
          if you'd like to keep your Purple membership active. If the timing isn't right,
          there's no pressure here.
        </p>

        <p style="font-size:16px;line-height:1.7;margin:0 0 24px;">
          If you'd like to stay in, you can do so at
          <a href="https://perena.org/invest" style="color:#6134CD;">perena.org/invest</a>.
          If you have questions or want to talk through anything, just reply to this message
          or book a call with us — I'm always happy to chat.
        </p>

        <!-- CTA buttons -->
        <table cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding-right:12px;">
              <a href="https://perena.org/invest"
                style="display:inline-block;background:#6134CD;color:#ffffff;text-decoration:none;
                       padding:12px 24px;border-radius:6px;font-family:Arial,sans-serif;
                       font-size:15px;font-weight:bold;">
                Restore my position
              </a>
            </td>
            <td>
              <a href="https://cal.com/perena"
                style="display:inline-block;background:#ffffff;color:#6134CD;text-decoration:none;
                       padding:12px 24px;border-radius:6px;font-family:Arial,sans-serif;
                       font-size:15px;font-weight:bold;border:1.5px solid #6134CD;">
                Book a call with Anna ☕
              </a>
            </td>
          </tr>
        </table>

        <p style="font-size:16px;line-height:1.7;margin:32px 0 0;">
          Either way, it's been a genuine pleasure having you as part of this founding group.
          You'll always have a place here when the timing is right :)
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

module.exports = { expiryTemplate };
