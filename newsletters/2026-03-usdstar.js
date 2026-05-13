const { newsletterTemplate } = require('./template');

// IMAGES: replace these with your actual hosted image URLs before sending
const HERO_IMAGE_URL  = 'YOUR_HERO_IMAGE_URL';   // hand touching flower (dark purple bg)
const BODY_IMAGE_URL  = 'YOUR_BODY_IMAGE_URL';   // luxury wax-seal gift boxes

const contentHtml = `
  <!-- Headline -->
  <h1 style="font-size:28px;font-weight:900;text-align:center;margin:0 0 16px;line-height:1.2;">
    USD* Junior, USD* Protected.
  </h1>

  <!-- Subtitle -->
  <p style="font-size:16px;font-weight:bold;text-align:center;margin:0 0 12px;">
    We built USD* Junior and USD* Protected based on your feedback.
  </p>

  <!-- Intro -->
  <p style="font-size:15px;line-height:1.7;text-align:center;color:#444;margin:0 0 32px;">
    Some of you wanted higher returns and were comfortable taking on more risk.
    Others wanted protection — a version of USD* that prioritizes capital preservation.
  </p>

  <hr style="border:none;border-top:1px solid #e5e5e5;margin:32px 0;" />

  <!-- Section: Three Models -->
  <p style="font-size:16px;font-weight:bold;margin:0 0 12px;">Three Models. One Foundation.</p>

  <p style="font-size:15px;line-height:1.7;color:#333;margin:0 0 16px;">
    There's now a standard model, a pro version, and a protected option.
    Each serves different needs, all built on the same infrastructure.
  </p>

  <p style="font-size:15px;line-height:1.7;color:#333;margin:0 0 12px;">
    <em>USD*</em> — Our flagship. ~8% APY, diversified strategies, continuous redemption.
    The balanced option most holders choose.
  </p>

  <p style="font-size:15px;line-height:1.7;color:#333;margin:0 0 12px;">
    <em>USD*-J (Junior)</em> — Amplified returns. 12–20%+ APY by taking a first-loss
    position in the capital stack. You absorb risk first, you earn more.
    Built for conviction holders.
  </p>

  <p style="font-size:15px;line-height:1.7;color:#333;margin:0 0 32px;">
    <em>USD*-P (Protected)</em> — The Protected. 5% fixed APY with insurance backstop.
    Many of you wanted a "safe" version where you could earn yield without bearing downside
    risk. This is it. $1M initial capacity.
  </p>

  <hr style="border:none;border-top:1px solid #e5e5e5;margin:0 0 32px;" />

  <!-- Section: Choose Your Model -->
  <p style="font-size:16px;font-weight:bold;margin:0 0 12px;">Choose Your Model</p>

  <p style="font-size:15px;line-height:1.7;color:#333;margin:0 0 12px;">
    All three are live at <a href="https://perena.org/invest" style="color:#6134CD;">perena.org/invest</a>
    with other premium products such as the GLOW and NEST vaults.
  </p>

  <p style="font-size:15px;line-height:1.7;color:#333;margin:0 0 12px;">
    Pick the risk profile that fits you today. Switch as your goals evolve.
    Same rigorous oversight and underlyings across all products.
  </p>

  <hr style="border:none;border-top:1px solid #e5e5e5;margin:32px 0;" />

  <!-- Footer note -->
  <p style="font-size:15px;line-height:1.7;color:#333;margin:0 0 12px;">
    As always, we're here if you have questions. Reply to this email or reach out to
    <a href="mailto:help@perena.org" style="color:#6134CD;">help@perena.org</a>.
  </p>

  <p style="font-size:15px;margin:0 0 8px;">
    <a href="YOUR_GITBOOK_URL" style="color:#6134CD;text-decoration:underline;">Go to our gitbook for more details</a>
  </p>
`;

function usdStarNewsletter({ trackingPixelUrl = '' } = {}) {
  return newsletterTemplate({
    subject: 'USD* Junior, USD* Protected — Three Models. One Foundation.',
    preheader: 'We built two new versions of USD* based on your feedback. Higher returns or capital protection — your call.',
    heroImageUrl: HERO_IMAGE_URL,
    bodyImageUrl: BODY_IMAGE_URL,
    contentHtml,
    ctaLabel: 'Explore the USD* Line Up',
    ctaUrl: 'https://perena.org/invest',
    trackingPixelUrl,
  });
}

module.exports = { usdStarNewsletter };
