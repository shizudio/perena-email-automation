// Reusable newsletter wrapper — swap content each send
// Images must be hosted URLs (not local files) for mass newsletter delivery
function newsletterTemplate({
  subject,
  preheader = '',
  heroImageUrl,        // required: hosted URL of hero image
  bodyImageUrl,        // optional: second image mid-body
  contentHtml,         // main body HTML
  ctaLabel,
  ctaUrl,
  trackingPixelUrl = '', // set once tracker server is live
  viewInBrowserUrl = '#',
}) {
  return {
    subject,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;">

  <!-- Preheader (hidden preview text) -->
  <div style="display:none;max-height:0;overflow:hidden;color:#f0f0f0;font-size:1px;">${preheader}</div>

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:24px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;">

        <!-- View in browser -->
        <tr>
          <td style="padding:12px 24px;text-align:right;background:#ffffff;">
            <a href="${viewInBrowserUrl}" style="font-size:12px;color:#888;text-decoration:underline;">View in browser</a>
          </td>
        </tr>

        <!-- Hero image -->
        <tr>
          <td style="padding:0;">
            <img src="${heroImageUrl}" alt="" width="600" style="width:100%;display:block;" />
          </td>
        </tr>

        <!-- Body content -->
        <tr>
          <td style="padding:40px 48px 0 48px;">
            ${contentHtml}
          </td>
        </tr>

        ${ctaLabel && ctaUrl ? `
        <!-- Primary CTA -->
        <tr>
          <td style="padding:28px 48px;">
            <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
              <tr>
                <td style="background:#6134CD;border-radius:6px;">
                  <a href="${ctaUrl}"
                    style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:15px;
                           font-weight:bold;text-decoration:none;font-family:Arial,sans-serif;">
                    ${ctaLabel}
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>` : ''}

        ${bodyImageUrl ? `
        <!-- Body image -->
        <tr>
          <td style="padding:0 48px 32px;">
            <img src="${bodyImageUrl}" alt="" width="504" style="width:100%;display:block;border-radius:6px;" />
          </td>
        </tr>` : ''}

        <!-- Quote block -->
        <tr>
          <td style="padding:0 48px 40px;">
            <blockquote style="margin:0;padding:12px 20px;border-left:4px solid #6134CD;">
              <p style="font-style:italic;font-size:15px;line-height:1.7;color:#444;margin:0;">
                "Wealth is not about having a lot of money; it's about having a lot of options."
              </p>
            </blockquote>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#1a1845;padding:40px 48px;border-radius:0 0 8px 8px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:50%;vertical-align:top;">
                  <!-- Logo + links -->
                  <p style="color:#ffffff;font-size:15px;font-weight:bold;margin:0 0 16px;">Perena.org</p>
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding-right:10px;">
                        <a href="https://x.com/perena" style="display:inline-block;width:28px;height:28px;border:1px solid #ffffff44;border-radius:50%;text-align:center;line-height:28px;color:#ffffff;font-size:12px;text-decoration:none;">X</a>
                      </td>
                      <td style="padding-right:10px;">
                        <a href="https://perena.org" style="display:inline-block;width:28px;height:28px;border:1px solid #ffffff44;border-radius:50%;text-align:center;line-height:28px;color:#ffffff;font-size:12px;text-decoration:none;">🔗</a>
                      </td>
                      <td>
                        <a href="mailto:help@perena.org" style="display:inline-block;width:28px;height:28px;border:1px solid #ffffff44;border-radius:50%;text-align:center;line-height:28px;color:#ffffff;font-size:12px;text-decoration:none;">✉</a>
                      </td>
                    </tr>
                  </table>
                </td>
                <td style="width:50%;vertical-align:top;text-align:right;">
                  <p style="color:#aaa;font-size:12px;line-height:1.6;margin:0 0 8px;">
                    You received this email because you signed up on our website or made a purchase from us.
                  </p>
                  <a href="#" style="color:#c4a8ff;font-size:12px;">Unsubscribe</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

  <!-- Open tracking pixel -->
  ${trackingPixelUrl ? `<img src="${trackingPixelUrl}" width="1" height="1" style="display:none;" />` : ''}

</body>
</html>
    `.trim(),
    attachments: [],
  };
}

module.exports = { newsletterTemplate };
