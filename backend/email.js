const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

let transporter = null;

function getTransporter() {
  const { EMAIL_FROM, EMAIL_TO, EMAIL_API_KEY } = process.env;

  if (!transporter && EMAIL_FROM && EMAIL_API_KEY) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_FROM.trim(),
        pass: EMAIL_API_KEY.trim()
      }
    });
  }
  return transporter;
}

async function sendEnquiryEmail(enquiry) {
  const currentTransporter = getTransporter();
  const { EMAIL_FROM, EMAIL_TO } = process.env;

  if (!currentTransporter || !EMAIL_TO) {
    console.warn('⚠️ Email notification skipped: EMAIL_FROM, EMAIL_TO, or EMAIL_API_KEY missing in backend/.env.');
    return false;
  }

  const { name, email, phone, message, source, ai_score, created_at } = enquiry;
  const dateStr = created_at || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const mailOptions = {
    from: `"Sharada Website" <${EMAIL_FROM.trim()}>`,
    to: EMAIL_TO.trim(),
    replyTo: email ? email.trim() : undefined,
    subject: `[New Website Lead] from ${name || 'Visitor'} (AI Score: ${ai_score || 0}/100)`,
    text: `NEW WEBSITE ENQUIRY

Name:
${name || 'N/A'}

Email:
${email || 'N/A'}

Phone:
${phone || 'N/A'}

AI Lead Score:
${ai_score !== undefined ? `${ai_score}/100` : 'N/A'}

Requirement / Details:
${message || 'N/A'}

Source:
${source || 'N/A'}

Date & Time:
${dateStr}
`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #c9a84c; margin-top: 0; border-bottom: 2px solid #c9a84c; padding-bottom: 10px;">New Website Enquiry</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Name:</td><td>${name || 'N/A'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${email}">${email || 'N/A'}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td>${phone || 'N/A'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">AI Score:</td><td><span style="background: #fdf5e6; color: #b8860b; padding: 2px 8px; border-radius: 4px; font-weight: bold;">${ai_score !== undefined ? `${ai_score}/100` : 'N/A'}</span></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Source:</td><td>${source || 'N/A'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Date:</td><td>${dateStr}</td></tr>
        </table>
        <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 6px; border-left: 4px solid #c9a84c;">
          <strong>Message / Requirement:</strong>
          <p style="white-space: pre-wrap; margin-top: 8px; color: #333;">${message || 'N/A'}</p>
        </div>
      </div>
    `
  };

  try {
    const info = await currentTransporter.sendMail(mailOptions);
    console.log(`✅ Email notification sent successfully to ${EMAIL_TO}: MessageID ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending email notification:', error.message);
    return false;
  }
}

module.exports = {
  sendEnquiryEmail,
  getTransporter
};
