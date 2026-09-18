const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

function buildLoginSuccessEmail(user) {
  const name = escapeHtml(user.name || "there");
  const email = escapeHtml(user.email);
  const loginTime = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
  const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

  return {
    subject: "Welcome back to Uomo — Login successful",
    text: `Hi ${user.name || "there"},\n\nYou have successfully logged in to Uomo.\nEmail: ${user.email}\nTime: ${loginTime} (Bangladesh time)\n\nIf this was not you, please reset your password immediately.`,
    html: `
      <!doctype html>
      <html lang="en">
        <body style="margin:0;background:#f5f5f3;font-family:Arial,Helvetica,sans-serif;color:#171717;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f3;padding:32px 12px;">
            <tr><td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border:1px solid #e7e4e0;">
                <tr><td style="padding:28px 36px;border-bottom:1px solid #e7e4e0;"><div style="font-size:28px;font-weight:700;letter-spacing:-1.5px;">uomo<span style="color:#d6001c;">.</span></div></td></tr>
                <tr><td style="padding:42px 36px 26px;"><div style="display:inline-block;background:#fff1f1;color:#d6001c;font-size:11px;font-weight:700;letter-spacing:1.5px;padding:8px 12px;">ACCOUNT SECURITY</div><h1 style="font-size:30px;line-height:1.2;margin:22px 0 12px;">Welcome back, ${name}</h1><p style="font-size:15px;line-height:1.7;color:#666;margin:0;">Your login to Uomo was successful. We are happy to have you back.</p></td></tr>
                <tr><td style="padding:0 36px 28px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#faf9f8;border-left:3px solid #d6001c;"><tr><td style="padding:18px 20px;font-size:13px;line-height:1.8;color:#555;"><strong style="color:#171717;">Login details</strong><br />Email: ${email}<br />Time: ${escapeHtml(loginTime)} (Bangladesh time)</td></tr></table></td></tr>
                <tr><td style="padding:0 36px 40px;"><a href="${escapeHtml(clientUrl)}" style="display:inline-block;background:#171717;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:1px;padding:15px 24px;">VISIT UOMO</a><p style="font-size:12px;line-height:1.7;color:#888;margin:26px 0 0;">If you did not make this login, please change your password and contact support as soon as possible.</p></td></tr>
                <tr><td style="padding:20px 36px;background:#171717;color:#ffffff;font-size:12px;line-height:1.6;">© ${new Date().getFullYear()} Uomo. Crafted for your everyday style.</td></tr>
              </table>
            </td></tr>
          </table>
        </body>
      </html>
    `,
  };
}

module.exports = buildLoginSuccessEmail;
