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

export async function sendContactMessage(data: { name: string; email: string; subject: string; message: string }) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || '"OtiZeka İletişim" <noreply@otizeka.com>';
  const to = process.env.CONTACT_RECEIVER_EMAIL || "otizeka@gmail.com";

  if (!host || !user || !pass) {
    console.log(`
============================================================
[YENİ İLETİŞİM MESAJI ALINDI]
Gönderen: ${data.name} <${data.email}>
Konu: ${data.subject}
Mesaj: ${data.message}
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
    to,
    replyTo: data.email,
    subject: `[OtiZeka İletişim Formu] ${data.subject}`,
    text: `Ad Soyad: ${data.name}\nE-posta: ${data.email}\nKonu: ${data.subject}\n\nMesaj:\n${data.message}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e4e4e7; border-radius: 16px; background-color: #ffffff;">
        <h2 style="color: #059669; margin-bottom: 20px; font-weight: 800; font-size: 20px;">OtiZeka Web Sitesinden Yeni Mesaj</h2>
        <div style="background-color: #f8fafc; padding: 16px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
          <p style="margin: 6px 0; font-size: 14px; color: #334155;"><strong>Gönderen:</strong> ${data.name}</p>
          <p style="margin: 6px 0; font-size: 14px; color: #334155;"><strong>E-Posta:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p style="margin: 6px 0; font-size: 14px; color: #334155;"><strong>Konu:</strong> ${data.subject}</p>
        </div>
        <div style="padding: 16px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h3 style="font-size: 14px; color: #64748b; margin-top: 0; text-transform: uppercase; letter-spacing: 0.05em;">Mesaj İçeriği:</h3>
          <p style="font-size: 15px; color: #1e293b; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
        </div>
        <p style="margin-top: 24px; font-size: 12px; color: #94a3b8; text-align: center;">Bu e-posta otizeka.com iletişim formundan otomatik olarak iletilmiştir.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
