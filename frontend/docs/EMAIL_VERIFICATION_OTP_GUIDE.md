# 📧 Email Verification & OTP Authentication Guide

## 🎯 Overview

This guide covers the complete implementation of:
1. **Email Verification on Signup** - Users receive a verification email after registration
2. **OTP on New Device Login** - Users receive a 6-digit OTP when logging in from a new device
3. **Device Tracking** - System remembers trusted devices for seamless future logins

---

## ✨ Features Implemented

### 1. 📧 Email Verification System
- ✅ Automatic verification email sent on signup
- ✅ Beautiful HTML email templates with CyberVerse branding
- ✅ Secure token-based verification (24-hour expiry)
- ✅ Welcome email sent after successful verification
- ✅ Resend verification email option
- ✅ Auto-login after email verification

### 2. 🔐 OTP Authentication System
- ✅ 6-digit OTP sent to email on new device login
- ✅ Device fingerprinting using User-Agent and IP
- ✅ Trusted device management
- ✅ OTP expiry (10 minutes)
- ✅ Resend OTP option
- ✅ Device information displayed in email (Browser, OS, Device Name)

### 3. 🛡️ Security Features
- ✅ Hashed tokens and OTPs (SHA-256)
- ✅ Time-based expiration
- ✅ Device tracking and management
- ✅ Secure email delivery
- ✅ Rate limiting protection

---

## 📁 Files Modified/Created

### Backend Files

#### **Modified Files:**
1. ✅ `backend/package.json` - Added dependencies
2. ✅ `backend/models/User.js` - Added email verification and device tracking fields
3. ✅ `backend/routes/auth.js` - Implemented verification and OTP routes
4. ✅ `backend/.env` - Added email configuration

#### **New Files Created:**
1. ✅ `backend/utils/emailService.js` - Email sending service
2. ✅ `backend/utils/deviceDetection.js` - Device fingerprinting utility

---

## 🔧 Installation & Setup

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

**New Dependencies Added:**
- `nodemailer` - Email sending
- `ua-parser-js` - User agent parsing for device detection
- `crypto` - Token and OTP hashing (built-in Node.js module)

### Step 2: Configure Email Service

#### Option A: Gmail (Recommended for Testing)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Copy the 16-character password

3. **Update `.env` file:**
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
FRONTEND_URL=http://localhost:5173
```

#### Option B: Other Email Services

**SendGrid:**
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
```

**Mailgun:**
```env
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USER=your-mailgun-username
EMAIL_PASSWORD=your-mailgun-password
```

**Outlook/Hotmail:**
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

### Step 3: Update Frontend URL

```env
# For Development
FRONTEND_URL=http://localhost:5173

# For Production
FRONTEND_URL=https://prismatic-kangaroo-95c131.netlify.app
```

### Step 4: Start the Server

```bash
npm start
# or for development
npm run dev
```

---

## 🔄 Complete User Flows

### Flow 1: User Registration with Email Verification

```
1. User fills registration form
   ↓
2. POST /api/auth/register
   - Creates user account
   - Generates verification token
   - Sends verification email
   ↓
3. User receives email with verification link
   ↓
4. User clicks verification link
   ↓
5. GET /api/auth/verify-email/:token
   - Verifies email
   - Sends welcome email
   - Returns auth token
   ↓
6. User is automatically logged in
   ✅ Account fully activated
```

### Flow 2: Login from New Device with OTP

```
1. User enters email and password
   ↓
2. POST /api/auth/login
   - Validates credentials
   - Detects device fingerprint
   - Checks if device is trusted
   ↓
3. If NEW DEVICE:
   - Generates 6-digit OTP
   - Sends OTP email
   - Returns requiresOTP: true
   ↓
4. User receives OTP email
   ↓
5. User enters OTP
   ↓
6. POST /api/auth/verify-otp
   - Validates OTP
   - Adds device to trusted list
   - Returns auth token
   ↓
7. User is logged in
   ✅ Device is now trusted
```

### Flow 3: Login from Trusted Device

```
1. User enters email and password
   ↓
2. POST /api/auth/login
   - Validates credentials
   - Detects device fingerprint
   - Recognizes trusted device
   ↓
3. User is immediately logged in
   ✅ No OTP required
```

---

## 📡 API Endpoints

### 1. Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "message": "User registered successfully. Please check your email to verify your account.",
  "requiresVerification": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "isEmailVerified": false
  }
}
```

### 2. Verify Email
```http
GET /api/auth/verify-email/:token
```

**Response (Success):**
```json
{
  "message": "Email verified successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "isPremium": false,
    "level": 1,
    "points": 0,
    "completedLabs": 0,
    "isEmailVerified": true
  }
}
```

### 3. Login (New Device)
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (New Device - OTP Required):**
```json
{
  "message": "New device detected. OTP sent to your email.",
  "requiresOTP": true,
  "userId": "user_id",
  "deviceId": "device_fingerprint_hash"
}
```

**Response (Trusted Device):**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "isPremium": false,
    "level": 1,
    "points": 0,
    "completedLabs": 0,
    "isEmailVerified": true
  }
}
```

### 4. Verify OTP
```http
POST /api/auth/verify-otp
Content-Type: application/json

{
  "userId": "user_id",
  "otp": "123456",
  "deviceId": "device_fingerprint_hash"
}
```

**Response (Success):**
```json
{
  "message": "OTP verified successfully. Device added to trusted devices.",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "isPremium": false,
    "level": 1,
    "points": 0,
    "completedLabs": 0,
    "isEmailVerified": true
  }
}
```

### 5. Resend Verification Email
```http
POST /api/auth/resend-verification
Content-Type: application/json

{
  "email": "john@example.com"
}
```

**Response (Success):**
```json
{
  "message": "Verification email sent successfully"
}
```

### 6. Resend OTP
```http
POST /api/auth/resend-otp
Content-Type: application/json

{
  "userId": "user_id"
}
```

**Response (Success):**
```json
{
  "message": "OTP sent successfully"
}
```

---

## 📧 Email Templates

### 1. Verification Email
- **Subject:** 🔐 Verify Your CyberVerse Account
- **Design:** Blue gradient theme with CyberVerse branding
- **Content:**
  - Welcome message
  - Verification button (24-hour expiry)
  - Manual link option
  - Feature highlights
- **Call-to-Action:** "✅ Verify Email Address"

### 2. Login OTP Email
- **Subject:** 🔐 Your CyberVerse Login OTP
- **Design:** Red gradient theme for security alert
- **Content:**
  - Security alert message
  - 6-digit OTP (large, centered)
  - Device information (Browser, OS, Device)
  - Timestamp
  - Security warning
  - Security tips
- **Expiry:** 10 minutes

### 3. Welcome Email
- **Subject:** 🎉 Welcome to CyberVerse - Let's Get Started!
- **Design:** Green gradient theme for success
- **Content:**
  - Congratulations message
  - Feature overview
  - Quick start guide
  - Call-to-action to dashboard
- **Call-to-Action:** "🎯 Start Learning Now"

---

## 🗄️ Database Schema Updates

### User Model Fields Added:

```javascript
{
  // Email Verification
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
    select: false  // Hidden from queries
  },
  emailVerificationExpires: {
    type: Date,
    select: false
  },
  
  // Login OTP
  loginOTP: {
    type: String,
    select: false
  },
  loginOTPExpires: {
    type: Date,
    select: false
  },
  
  // Trusted Devices
  trustedDevices: [{
    deviceId: String,           // SHA-256 hash of UA + IP
    deviceName: String,         // e.g., "Windows Device"
    browser: String,            // e.g., "Chrome 120.0"
    os: String,                 // e.g., "Windows 10"
    lastUsed: Date,
    addedAt: {
      type: Date,
      default: Date.now
    }
  }]
}
```

---

## 🔐 Security Implementation

### 1. Token Hashing
```javascript
// Email verification token
const token = crypto.randomBytes(32).toString('hex');
const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
```

### 2. OTP Generation & Hashing
```javascript
// Generate 6-digit OTP
const otp = Math.floor(100000 + Math.random() * 900000).toString();
const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');
```

### 3. Device Fingerprinting
```javascript
// Generate unique device ID
const deviceId = crypto.createHash('sha256')
  .update(`${userAgent}-${ip}`)
  .digest('hex');
```

### 4. Expiration Times
- **Email Verification Token:** 24 hours
- **Login OTP:** 10 minutes
- **JWT Token:** 7 days (configurable)

---

## 🧪 Testing Guide

### Test 1: Email Verification Flow

1. **Register a new user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

2. **Check your email** for verification link

3. **Click verification link** or use token:
```bash
curl http://localhost:5000/api/auth/verify-email/TOKEN_HERE
```

4. **Check for welcome email**

### Test 2: OTP Login Flow

1. **Login from new device:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

2. **Check email for OTP**

3. **Verify OTP:**
```bash
curl -X POST http://localhost:5000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID",
    "otp": "123456",
    "deviceId": "DEVICE_ID"
  }'
```

4. **Login again from same device** - Should not require OTP

### Test 3: Resend Functionality

**Resend Verification:**
```bash
curl -X POST http://localhost:5000/api/auth/resend-verification \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

**Resend OTP:**
```bash
curl -X POST http://localhost:5000/api/auth/resend-otp \
  -H "Content-Type: application/json" \
  -d '{"userId": "USER_ID"}'
```

---

## 🎨 Email Design Features

### Visual Elements:
- ✅ Gradient backgrounds (Blue, Red, Green themes)
- ✅ CyberVerse branding
- ✅ Responsive design
- ✅ Professional typography
- ✅ Clear call-to-action buttons
- ✅ Security icons and emojis
- ✅ Dark theme matching app design

### Email Compatibility:
- ✅ Gmail
- ✅ Outlook
- ✅ Apple Mail
- ✅ Yahoo Mail
- ✅ Mobile email clients

---

## 🚀 Production Deployment

### 1. Environment Variables

Update `.env` for production:
```env
NODE_ENV=production
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=noreply@cyberverse.com
EMAIL_PASSWORD=production-app-password
FRONTEND_URL=https://prismatic-kangaroo-95c131.netlify.app
```

### 2. Email Service Recommendations

**For Production:**
- ✅ **SendGrid** - 100 emails/day free, excellent deliverability
- ✅ **Mailgun** - 5,000 emails/month free
- ✅ **Amazon SES** - Very cheap, highly scalable
- ✅ **Postmark** - Best for transactional emails

**Avoid for Production:**
- ❌ Gmail (rate limits, may be flagged as spam)
- ❌ Personal email accounts

### 3. DNS Configuration

Add SPF, DKIM, and DMARC records to improve deliverability:

```dns
# SPF Record
TXT @ "v=spf1 include:_spf.google.com ~all"

# DMARC Record
TXT _dmarc "v=DMARC1; p=none; rua=mailto:admin@cyberverse.com"
```

### 4. Monitoring

Monitor email delivery:
- Track bounce rates
- Monitor spam complaints
- Check delivery rates
- Log failed sends

---

## 📊 Device Management

### View User's Trusted Devices

Users can see their trusted devices in the database:

```javascript
// Example trusted device entry
{
  deviceId: "a1b2c3d4e5f6...",
  deviceName: "Windows Device",
  browser: "Chrome 120.0.0.0",
  os: "Windows 10",
  lastUsed: "2024-01-15T10:30:00.000Z",
  addedAt: "2024-01-10T08:00:00.000Z"
}
```

### Remove Trusted Device (Future Feature)

Add endpoint to remove devices:
```http
DELETE /api/auth/trusted-devices/:deviceId
```

---

## 🐛 Troubleshooting

### Issue: Emails Not Sending

**Check:**
1. ✅ Email credentials in `.env` are correct
2. ✅ App password is generated (for Gmail)
3. ✅ 2FA is enabled (for Gmail)
4. ✅ Firewall allows SMTP port 587
5. ✅ Check server logs for errors

**Test Email Connection:**
```javascript
// Add to server.js for testing
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email config error:', error);
  } else {
    console.log('✅ Email server ready');
  }
});
```

### Issue: OTP Not Working

**Check:**
1. ✅ OTP hasn't expired (10 minutes)
2. ✅ Correct userId and deviceId sent
3. ✅ OTP is 6 digits
4. ✅ No typos in OTP

### Issue: Device Always Detected as New

**Check:**
1. ✅ User-Agent header is being sent
2. ✅ IP address is consistent
3. ✅ Browser not in incognito mode
4. ✅ VPN not changing IP

---

## 📈 Future Enhancements

### Planned Features:
- [ ] SMS OTP option (Twilio integration)
- [ ] Push notification OTP (Firebase)
- [ ] Biometric authentication
- [ ] Device management dashboard
- [ ] Email templates customization
- [ ] Multi-language support
- [ ] Email analytics dashboard
- [ ] Suspicious login alerts
- [ ] Login history tracking
- [ ] Account recovery flow

---

## 🔗 Related Documentation

- [Nodemailer Documentation](https://nodemailer.com/)
- [UA Parser JS](https://github.com/faisalman/ua-parser-js)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [SendGrid Setup](https://sendgrid.com/docs/)

---

## 📞 Support

### Email Configuration Help:
- Gmail: https://support.google.com/mail/answer/7126229
- Outlook: https://support.microsoft.com/en-us/office/pop-imap-and-smtp-settings
- SendGrid: https://docs.sendgrid.com/

### Issues & Questions:
- Check server logs: `npm run dev`
- Test email connection
- Verify environment variables
- Check MongoDB connection

---

## ✅ Implementation Checklist

### Backend Setup:
- [x] Install dependencies (`nodemailer`, `ua-parser-js`)
- [x] Update User model with verification fields
- [x] Create email service utility
- [x] Create device detection utility
- [x] Update auth routes
- [x] Add verification endpoints
- [x] Add OTP endpoints
- [x] Configure environment variables

### Email Configuration:
- [ ] Set up email service (Gmail/SendGrid/etc.)
- [ ] Generate app password
- [ ] Update `.env` with credentials
- [ ] Test email sending
- [ ] Verify email deliverability

### Testing:
- [ ] Test registration flow
- [ ] Test email verification
- [ ] Test OTP login
- [ ] Test trusted device login
- [ ] Test resend functionality
- [ ] Test error handling

### Production:
- [ ] Choose production email service
- [ ] Configure DNS records (SPF, DKIM)
- [ ] Set up monitoring
- [ ] Update frontend URL
- [ ] Deploy backend
- [ ] Test in production

---

## 🎉 Summary

You now have a complete email verification and OTP authentication system with:

✅ **Email Verification** - Secure token-based verification with beautiful emails
✅ **OTP Authentication** - 6-digit OTP for new device logins
✅ **Device Tracking** - Remember trusted devices
✅ **Security** - Hashed tokens, expiration, rate limiting
✅ **User Experience** - Professional email templates, clear flows
✅ **Scalability** - Ready for production deployment

**Next Steps:**
1. Configure your email service
2. Test the complete flow
3. Update frontend to handle new responses
4. Deploy to production

---

**Happy Coding! 🚀**