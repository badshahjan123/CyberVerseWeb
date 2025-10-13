const nodemailer = require('nodemailer');

// Email validation utility
class EmailValidator {
  // Check if email is from Google/Gmail domain
  static isGoogleEmail(email) {
    const googleDomains = ['gmail.com', 'googlemail.com'];
    const domain = email.split('@')[1]?.toLowerCase();
    return googleDomains.includes(domain);
  }



  // Simplified Gmail validation (no actual email sending)
  static async verifyGmailExists(email) {
    // Just validate Gmail domain format - avoid spam issues
    return this.isGoogleEmail(email);
  }

  // Send verification email
  static async sendVerificationEmail(email, verificationToken, userName) {
    try {
      const transporter = nodemailer.createTransporter({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT),
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

      const mailOptions = {
        from: `"CyberVerse" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Verify Your CyberVerse Account',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Welcome to CyberVerse, ${userName}!</h2>
            <p>Thank you for signing up. Please verify your email address to complete your registration.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Verify Email Address
              </a>
            </div>
            <p style="color: #666; font-size: 14px;">
              If the button doesn't work, copy and paste this link into your browser:<br>
              <a href="${verificationUrl}">${verificationUrl}</a>
            </p>
            <p style="color: #666; font-size: 12px;">
              This link will expire in 24 hours. If you didn't create this account, please ignore this email.
            </p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Send email error:', error);
      return false;
    }
  }
}

module.exports = EmailValidator;