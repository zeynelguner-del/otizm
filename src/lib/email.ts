import nodemailer from "nodemailer";

export async function sendResetEmail(email: string, code: string) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || '"OtiZeka Destek" <noreply@otizeka.com>';

  if (!host || !user || !pass) {
    // Console fallback
    console.warn(`
============================================================
[SMTP FALLBACK]
E-posta servisi yapılandırılmadı (SMTP_HOST, SMTP_USER veya SMTP_PASS eksik).
Gönderilecek Adres: ${email}
Şifre Sıfırlama Kodu: ${code}
============================================================
    `);
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });

  const mailOptions = {
    from,
    to: email,
    subject: "OtiZeka Şifre Sıfırlama Kodu",
    text: `Merhaba,\n\nOtiZeka hesabınızın şifresini sıfırlamak için doğrulama kodunuz: ${code}\n\nBu kod 15 dakika boyunca geçerlidir.\n\nEğer bu isteği siz yapmadıysanız, lütfen bu e-postayı dikkate almayın.`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e4e4e7; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        <h2 style="color: #0d9488; margin-bottom: 20px; font-weight: 800; font-size: 22px;">OtiZeka Şifre Sıfırlama</h2>
        <p style="font-size: 15px; color: #374151; line-height: 1.5;">Merhaba,</p>
        <p style="font-size: 15px; color: #374151; line-height: 1.5;">OtiZeka hesabınızın şifresini sıfırlamak için doğrulama kodunuz aşağıdadır:</p>
        <div style="background-color: #f4f4f5; padding: 18px; text-align: center; border-radius: 12px; margin: 24px 0; border: 1px solid #e4e4e7;">
          <span style="font-size: 28px; font-weight: 800; letter-spacing: 6px; color: #111827;">${code}</span>
        </div>
        <p style="color: #6b7280; font-size: 13px; line-height: 1.5;">Bu kod 15 dakika boyunca geçerlidir.</p>
        <hr style="border: 0; border-top: 1px solid #e4e4e7; margin: 24px 0;" />
        <p style="color: #9ca3af; font-size: 12px; line-height: 1.5;">Eğer bu şifre sıfırlama talebini siz gerçekleştirmediyseniz, bu e-postayı güvenle yoksayabilirsiniz.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
