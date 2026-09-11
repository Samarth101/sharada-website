const nodemailer = require('nodemailer');
require('dotenv').config();

const { EMAIL_FROM, EMAIL_TO, EMAIL_API_KEY } = process.env;

// Only configure transporter if credentials are provided
let transporter = null;
if (EMAIL_FROM && EMAIL_API_KEY && EMAIL_TO) {
  // We assume Gmail or a standard SMTP service here. 
  // For production, this might be adjusted based on the specific provider.
  transporter = nodemailer.createTransport({
    service: 'gmail', // Standard fallback, can be configured further
    auth: {
      user: EMAIL_FROM,
      pass: EMAIL_API_KEY
    }
  });
}

async function sendEnquiryEmail(enquiry) {
  if (!transporter || !EMAIL_TO) {
    console.warn('⚠️ Email credentials not configured in .env. Skipping email notification.');
    return false;
  }

  const { name, email, phone, message, source, created_at } = enquiry;
  
  // Format date if created_at is not provided yet
  const dateStr = created_at || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const mailOptions = {
    from: EMAIL_FROM,
    to: EMAIL_TO,
    subject: `New Website Enquiry from ${name || 'Visitor'}`,
    text: `NEW WEBSITE ENQUIRY

Name:
${name || 'N/A'}

Email:
${email || 'N/A'}

Phone:
${phone || 'N/A'}

Requirement:
${message || 'N/A'}

Source:
${source || 'N/A'}

Date:
${dateStr}
`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email notification sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email notification:', error);
    return false;
  }
}

module.exports = {
  sendEnquiryEmail
};
