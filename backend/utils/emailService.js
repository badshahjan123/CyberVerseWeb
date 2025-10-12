const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Send email verification
const sendVerificationEmail = async (email, name, verificationToken) => {
  try {
    const transporter = createTransporter();
    
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    
    const mailOptions = {
      from: `"CyberVerse" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🔐 Verify Your CyberVerse Account',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #0a0a0a;
              color: #ffffff;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 8px 32px rgba(0, 255, 255, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #00d4ff 0%, #0099ff 100%);
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              color: #ffffff;
              font-size: 28px;
              text-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }
            .content {
              padding: 40px 30px;
            }
            .content h2 {
              color: #00d4ff;
              margin-top: 0;
            }
            .content p {
              line-height: 1.6;
              color: #e0e0e0;
              font-size: 16px;
            }
            .button {
              display: inline-block;
              padding: 15px 40px;
              background: linear-gradient(135deg, #00d4ff 0%, #0099ff 100%);
              color: #ffffff;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
              margin: 20px 0;
              box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
              transition: transform 0.2s;
            }
            .button:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 20px rgba(0, 212, 255, 0.4);
            }
            .footer {
              background-color: #0d0d1a;
              padding: 20px;
              text-align: center;
              color: #888;
              font-size: 14px;
            }
            .divider {
              height: 2px;
              background: linear-gradient(90deg, transparent, #00d4ff, transparent);
              margin: 30px 0;
            }
            .info-box {
              background-color: rgba(0, 212, 255, 0.1);
              border-left: 4px solid #00d4ff;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🛡️ CyberVerse</h1>
            </div>
            <div class="content">
              <h2>Welcome to CyberVerse, ${name}! 🎉</h2>
              <p>Thank you for joining our cybersecurity learning platform. We're excited to have you on board!</p>
              
              <div class="divider"></div>
              
              <p>To get started and access all features, please verify your email address by clicking the button below:</p>
              
              <div style="text-align: center;">
                <a href="${verificationUrl}" class="button">✅ Verify Email Address</a>
              </div>
              
              <div class="info-box">
                <p style="margin: 0;"><strong>⏰ Important:</strong> This verification link will expire in 24 hours.</p>
              </div>
              
              <p>If the button doesn't work, copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #00d4ff;">${verificationUrl}</p>
              
              <div class="divider"></div>
              
              <p><strong>What's next?</strong></p>
              <ul style="color: #e0e0e0;">
                <li>🎯 Complete interactive cybersecurity labs</li>
                <li>🏆 Earn points and achievements</li>
                <li>📚 Access premium learning content</li>
                <li>🌟 Join our community of security enthusiasts</li>
              </ul>
              
              <p>If you didn't create this account, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>© 2024 CyberVerse. All rights reserved.</p>
              <p>Secure. Learn. Excel.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`✅ Verification email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending verification email:', error);
    return false;
  }
};

// Send login OTP
const sendLoginOTP = async (email, name, otp, deviceInfo) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"CyberVerse Security" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🔐 Your CyberVerse Login OTP',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #0a0a0a;
              color: #ffffff;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 8px 32px rgba(255, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #ff4757 0%, #ff6348 100%);
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              color: #ffffff;
              font-size: 28px;
              text-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }
            .content {
              padding: 40px 30px;
            }
            .content h2 {
              color: #ff4757;
              margin-top: 0;
            }
            .content p {
              line-height: 1.6;
              color: #e0e0e0;
              font-size: 16px;
            }
            .otp-box {
              background: linear-gradient(135deg, #ff4757 0%, #ff6348 100%);
              padding: 30px;
              text-align: center;
              border-radius: 12px;
              margin: 30px 0;
              box-shadow: 0 4px 20px rgba(255, 71, 87, 0.3);
            }
            .otp-code {
              font-size: 42px;
              font-weight: bold;
              letter-spacing: 8px;
              color: #ffffff;
              text-shadow: 0 2px 4px rgba(0,0,0,0.2);
              margin: 10px 0;
            }
            .device-info {
              background-color: rgba(255, 71, 87, 0.1);
              border-left: 4px solid #ff4757;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .device-info p {
              margin: 5px 0;
              font-size: 14px;
            }
            .warning-box {
              background-color: rgba(255, 193, 7, 0.1);
              border: 2px solid #ffc107;
              padding: 15px;
              margin: 20px 0;
              border-radius: 8px;
              text-align: center;
            }
            .footer {
              background-color: #0d0d1a;
              padding: 20px;
              text-align: center;
              color: #888;
              font-size: 14px;
            }
            .divider {
              height: 2px;
              background: linear-gradient(90deg, transparent, #ff4757, transparent);
              margin: 30px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Security Alert</h1>
            </div>
            <div class="content">
              <h2>New Device Login Detected</h2>
              <p>Hello ${name},</p>
              <p>We detected a login attempt from a new device. To ensure your account security, please use the OTP below to complete your login:</p>
              
              <div class="otp-box">
                <p style="margin: 0; color: #ffffff; font-size: 14px;">Your One-Time Password</p>
                <div class="otp-code">${otp}</div>
                <p style="margin: 0; color: #ffffff; font-size: 14px;">⏰ Valid for 10 minutes</p>
              </div>
              
              <div class="device-info">
                <p><strong>📱 Device Information:</strong></p>
                <p>🖥️ Device: ${deviceInfo.deviceName}</p>
                <p>🌐 Browser: ${deviceInfo.browser}</p>
                <p>💻 OS: ${deviceInfo.os}</p>
                <p>🕐 Time: ${new Date().toLocaleString()}</p>
              </div>
              
              <div class="divider"></div>
              
              <div class="warning-box">
                <p style="margin: 0; color: #ffc107; font-weight: bold;">⚠️ SECURITY WARNING</p>
                <p style="margin: 10px 0 0 0; color: #e0e0e0;">If you didn't attempt to log in, please change your password immediately and contact our support team.</p>
              </div>
              
              <p><strong>Security Tips:</strong></p>
              <ul style="color: #e0e0e0;">
                <li>🔒 Never share your OTP with anyone</li>
                <li>🚫 CyberVerse will never ask for your OTP via phone or email</li>
                <li>✅ Always verify the login device information</li>
                <li>🔐 Use a strong, unique password</li>
              </ul>
              
              <p>After successful verification, this device will be remembered for future logins.</p>
            </div>
            <div class="footer">
              <p>© 2024 CyberVerse. All rights reserved.</p>
              <p>Your Security is Our Priority 🛡️</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`✅ Login OTP sent to ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending login OTP:', error);
    return false;
  }
};

// Send welcome email after verification
const sendWelcomeEmail = async (email, name) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"CyberVerse Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🎉 Welcome to CyberVerse - Let\'s Get Started!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #0a0a0a;
              color: #ffffff;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 8px 32px rgba(0, 255, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #00ff88 0%, #00cc66 100%);
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              color: #ffffff;
              font-size: 28px;
              text-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }
            .content {
              padding: 40px 30px;
            }
            .content h2 {
              color: #00ff88;
              margin-top: 0;
            }
            .content p {
              line-height: 1.6;
              color: #e0e0e0;
              font-size: 16px;
            }
            .button {
              display: inline-block;
              padding: 15px 40px;
              background: linear-gradient(135deg, #00ff88 0%, #00cc66 100%);
              color: #0a0a0a;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
              margin: 20px 0;
              box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
            }
            .feature-box {
              background-color: rgba(0, 255, 136, 0.1);
              border-left: 4px solid #00ff88;
              padding: 15px;
              margin: 15px 0;
              border-radius: 4px;
            }
            .footer {
              background-color: #0d0d1a;
              padding: 20px;
              text-align: center;
              color: #888;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Email Verified!</h1>
            </div>
            <div class="content">
              <h2>Welcome Aboard, ${name}! 🚀</h2>
              <p>Your email has been successfully verified. You now have full access to all CyberVerse features!</p>
              
              <div style="text-align: center;">
                <a href="${process.env.FRONTEND_URL}/dashboard" class="button">🎯 Start Learning Now</a>
              </div>
              
              <h3 style="color: #00ff88;">🌟 What You Can Do Now:</h3>
              
              <div class="feature-box">
                <p><strong>🎓 Interactive Labs</strong></p>
                <p style="margin: 5px 0 0 0;">Access hands-on cybersecurity labs and challenges</p>
              </div>
              
              <div class="feature-box">
                <p><strong>🏆 Earn Achievements</strong></p>
                <p style="margin: 5px 0 0 0;">Complete challenges and climb the leaderboard</p>
              </div>
              
              <div class="feature-box">
                <p><strong>📚 Premium Content</strong></p>
                <p style="margin: 5px 0 0 0;">Upgrade to access advanced security courses</p>
              </div>
              
              <div class="feature-box">
                <p><strong>👥 Community</strong></p>
                <p style="margin: 5px 0 0 0;">Connect with fellow security enthusiasts</p>
              </div>
              
              <p><strong>🎯 Quick Start Guide:</strong></p>
              <ol style="color: #e0e0e0;">
                <li>Complete your profile setup</li>
                <li>Start with beginner-friendly labs</li>
                <li>Earn your first achievement</li>
                <li>Explore premium features</li>
              </ol>
              
              <p>Need help? Our support team is always here for you!</p>
            </div>
            <div class="footer">
              <p>© 2024 CyberVerse. All rights reserved.</p>
              <p>Happy Learning! 🎓</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    return false;
  }
};

module.exports = {
  sendVerificationEmail,
  sendLoginOTP,
  sendWelcomeEmail
};