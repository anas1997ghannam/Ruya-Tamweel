import nodemailer from "nodemailer";



export async function sendEmail(to: string, subject: string, message: string) {
  const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
  const emailHtml = 
    `<div style="font-family: 'Arial', sans-serif; direction: rtl; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <div style="background-color: #0D47A1; padding: 20px;">
          <h2 style="margin: 0; color: white; text-align: center;">رؤية وتمويل</h2>
        </div>
        <div style="padding: 30px; color: #333;">
          <p style="font-size: 18px; margin-bottom: 20px;">مرحبًا،</p>
          <p style="font-size: 16px; line-height: 1.7;">
            ${message}
          </p>
          <p style="margin-top: 30px; font-size: 14px; color: #888;">مع تحياتنا،<br />فريق رؤية وتمويل</p>
        </div>
        <div style="background-color: #eeeeee; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          هذا البريد تم إرساله إليك من منصة رؤية وتمويل
        </div>
      </div>
    </div>`
  ;

  return transporter.sendMail({
    from: `"رؤية وتمويل" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: emailHtml,
  });
}