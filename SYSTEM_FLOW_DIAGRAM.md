# 🔄 Email Verification & OTP System Flow Diagrams

## 📊 Complete System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    CyberVerse Authentication                     │
│                                                                   │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │   Signup     │    │    Login     │    │   Trusted    │      │
│  │   (Email     │───▶│   (OTP for   │───▶│   Device     │      │
│  │ Verification)│    │  New Device) │    │   (No OTP)   │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Flow 1: User Registration & Email Verification

```
┌─────────────┐
│   USER      │
│  (Browser)  │
└──────┬──────┘
       │
       │ 1. Fill registration form
       │    (name, email, password)
       ▼
┌─────────────────────────────────────────────────────────────┐
│  FRONTEND (Register.jsx)                                     │
│  • Validate form                                             │
│  • Send POST /api/auth/register                              │
└──────┬──────────────────────────────────────────────────────┘
       │
       │ 2. Registration request
       ▼
┌─────────────────────────────────────────────────────────────┐
│  BACKEND (auth.js)                                           │
│  • Create user with isEmailVerified: false                   │
│  • Generate verification token (SHA-256 hash)                │
│  • Set expiration (24 hours)                                 │
│  • Save user to database                                     │
└──────┬──────────────────────────────────────────────────────┘
       │
       │ 3. Send verification email
       ▼
┌─────────────────────────────────────────────────────────────┐
│  EMAIL SERVICE (emailService.js)                             │
│  • Create beautiful HTML email (blue theme)                  │
│  • Include verification link with token                      │
│  • Send via Nodemailer (SMTP)                                │
└──────┬──────────────────────────────────────────────────────┘
       │
       │ 4. Email sent
       ▼
┌─────────────────────────────────────────────────────────────┐
│  USER'S EMAIL INBOX                                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Subject: Verify Your CyberVerse Account               │  │
│  │ ┌─────────────────────────────────────────────────┐   │  │
│  │ │  🛡️ CyberVerse                                   │   │  │
│  │ │  Welcome! Please verify your email address      │   │  │
│  │ │  [Verify Email Address] ← Blue Button           │   │  │
│  │ │  Link expires in 24 hours                        │   │  │
│  │ └─────────────────────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────┘  │
└──────┬──────────────────────────────────────────────────────┘
       │
       │ 5. User clicks verification link
       ▼
┌─────────────────────────────────────────────────────────────┐
│  FRONTEND (VerifyEmail.jsx)                                  │
│  • Extract token from URL                                    │
│  • Show loading spinner                                      │
│  • Send GET /api/auth/verify-email/:token                    │
└──────┬──────────────────────────────────────────────────────┘
       │
       │ 6. Verify token
       ▼
┌─────────────────────────────────────────────────────────────┐
│  BACKEND (auth.js)                                           │
│  • Find user by hashed token                                 │
│  • Check if token expired                                    │
│  • Set isEmailVerified: true                                 │
│  • Generate JWT token for auto-login                         │
│  • Send welcome email                                        │
└──────┬──────────────────────────────────────────────────────┘
       │
       │ 7. Return JWT token
       ▼
┌─────────────────────────────────────────────────────────────┐
│  FRONTEND (VerifyEmail.jsx)                                  │
│  • Store JWT token in localStorage                           │
│  • Show success message ✅                                   │
│  • Redirect to dashboard (3 seconds)                         │
└──────┬──────────────────────────────────────────────────────┘
       │
       │ 8. User logged in!
       ▼
┌─────────────┐
│  DASHBOARD  │
│  (Verified) │
└─────────────┘
```

---

## 🔐 Flow 2: Login from New Device (OTP Required)

```
┌─────────────┐
│   USER      │
│  (Browser)  │
└──────┬──────┘
       │
       │ 1. Enter email & password
       ▼
┌─────────────────────────────────────────────────────────────┐
│  FRONTEND (Login.jsx)                                        │
│  • Validate credentials                                      │
│  • Send POST /api/auth/login                                 │
└──────┬──────────────────────────────────────────────────────┘
       │
       │ 2. Login request
       ▼
┌─────────────────────────────────────────────────────────────┐
│  BACKEND (auth.js)                                           │
│  • Verify email & password                                   │
│  • Check if email is verified                                │
│  • Generate device fingerprint:                              │
│    - Hash(User-Agent + IP Address)                           │
│  • Check if device is in trustedDevices array                │
└──────┬──────────────────────────────────────────────────────┘
       │
       │ 3. New device detected!
       ▼
┌─────────────────────────────────────────────────────────────┐
│  BACKEND (auth.js)                                           │
│  • Generate 6-digit OTP (random)                             │
│  • Hash OTP with SHA-256                                     │
│  • Set expiration (10 minutes)                               │
│  • Save to user.loginOTP                                     │
└──────┬──────────────────────────────────────────────────────┘
       │
       │ 4. Send OTP email
       ▼
┌─────────────────────────────────────────────────────────────┐
│  EMAIL SERVICE (emailService.js)                             │
│  • Create HTML email (red theme - security alert)            │
│  • Include 6-digit OTP                                       │
│  • Include device info (browser, OS, device name)            │
│  • Send via Nodemailer                                       │
└──────┬──────────────────────────────────────────────────────┘
       │
       │ 5. Email sent
       ▼
┌─────────────────────────────────────────────────────────────┐
│  USER'S EMAIL INBOX                                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Subject: CyberVerse Login Verification Code           │  │
│  │ ┌─────────────────────────────────────────────────┐   │  │
│  │ │  🛡️ CyberVerse - Security Alert                 │   │  │
│  │ │  New device login detected                       │   │  │
│  │ │                                                   │   │  │
│  │ │  Your verification code:                         │   │  │
│  │ │  ┌─────────┐                                     │   │  │
│  │ │  │ 123456  │ ← Large OTP                         │   │  │
│  │ │  └─────────┘                                     │   │  │
│  │ │                                                   │   │  │
│  │ │  Device: Chrome on Windows 10                    │   │  │
│  │ │  Time: 2024-01-15 10:30 AM                       │   │  │
│  │ │  Code expires in 10 minutes                      │   │  │
│  │ └─────────────────────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────┘  │
└──────┬──────────────────────────────────────────────────────┘
       │
       │ 6. Backend returns requiresOTP: true
       ▼
┌─────────────────────────────────────────────────────────────┐
│  FRONTEND (Login.jsx)                                        │
│  • Detect requiresOTP in response                            │
│  • Redirect to /verify-otp page                              │
│  • Pass userId, deviceId, email in state                     │
└──────┬──────────────────────────────────────────────────────┘
       │
       │ 7. Show OTP input page
       ▼
┌─────────────────────────────────────────────────────────────┐
│  FRONTEND (VerifyOTP.jsx)                                    │
│  • Show 6-digit OTP input boxes                              │
│  • Auto-focus first input                                    │
│  • Support paste functionality                               │
│  • Show device information                                   │
│  • Show "Resend OTP" button (60s cooldown)                   │
└──────┬──────────────────────────────────────────────────────┘
       │
       │ 8. User enters OTP from email
       ▼
┌─────────────────────────────────────────────────────────────┐
│  FRONTEND (VerifyOTP.jsx)                                    │
│  • Validate OTP (6 digits)                                   │
│  • Send POST /api/auth/verify-otp                            │
│    Body: { userId, otp, deviceId }                           │
└──────┬──────────────────────────────────────────────────────┘
       │
       │ 9. Verify OTP
       ▼
┌─────────────────────────────────────────────────────────────┐
│  BACKEND (auth.js)                                           │
│  • Find user by userId                                       │
│  • Hash submitted OTP                                        │
│  • Compare with stored hash                                  │
│  • Check if OTP expired                                      │
│  • Add device to trustedDevices array:                       │
│    {                                                          │
│      deviceId: hash,                                         │
│      deviceName: "Windows Device",                           │
│      browser: "Chrome 120.0",                                │
│      os: "Windows 10",                                       │
│      lastUsed: Date.now(),                                   │
│      addedAt: Date.now()                                     │
│    }                                                          │
│  • Generate JWT token                                        │
└──────┬──────────────────────────────────────────────────────┘
       │
       │ 10. Return JWT token
       ▼
┌─────────────────────────────────────────────────────────────┐
│  FRONTEND (VerifyOTP.jsx)                                    │
│  • Store JWT token in localStorage                           │
│  • Show success message ✅                                   │
│  • Redirect to dashboard                                     │
└──────┬──────────────────────────────────────────────────────┘
       │
       │ 11. User logged in!
       ▼
┌─────────────┐
│  DASHBOARD  │
│  (Trusted)  │
└─────────────┘
```

---

## 🔐 Flow 3: Login from Trusted Device (No OTP)

```
┌─────────────┐
│   USER      │
│  (Browser)  │
└──────┬──────┘
       │
       │ 1. Enter email & password
       ▼
┌─────────────────────────────────────────────────────────────┐
│  FRONTEND (Login.jsx)                                        │
│  • Validate credentials                                      │
│  • Send POST /api/auth/login                                 │
└──────┬──────────────────────────────────────────────────────┘
       │
       │ 2. Login request
       ▼
┌─────────────────────────────────────────────────────────────┐
│  BACKEND (auth.js)                                           │
│  • Verify email & password                                   │
│  • Generate device fingerprint                               │
│  • Check trustedDevices array                                │
│  • ✅ Device found in trusted list!                          │
│  • Update device.lastUsed timestamp                          │
│  • Generate JWT token immediately                            │
└──────┬──────────────────────────────────────────────────────┘
       │
       │ 3. Return JWT token (no OTP needed!)
       ▼
┌─────────────────────────────────────────────────────────────┐
│  FRONTEND (Login.jsx)                                        │
│  • Store JWT token in localStorage                           │
│  • Show success message ✅                                   │
│  • Redirect to dashboard                                     │
└──────┬──────────────────────────────────────────────────────┘
       │
       │ 4. User logged in immediately!
       ▼
┌─────────────┐
│  DASHBOARD  │
│  (Instant)  │
└─────────────┘
```

---

## 🔄 Device Fingerprinting Logic

```
┌─────────────────────────────────────────────────────────────┐
│  Device Fingerprint Generation                               │
│                                                               │
│  Input:                                                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64...)  │   │
│  │ IP Address: 192.168.1.100                            │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  Process:                                                     │
│  1. Combine: "User-Agent + IP Address"                       │
│  2. Hash with SHA-256                                        │
│  3. Result: "a1b2c3d4e5f6..."                                │
│                                                               │
│  Parse Device Info (ua-parser-js):                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Browser: Chrome 120.0                                │   │
│  │ OS: Windows 10                                       │   │
│  │ Device: Desktop                                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  Store in Database:                                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ {                                                    │   │
│  │   deviceId: "a1b2c3d4e5f6...",                       │   │
│  │   deviceName: "Windows Device",                      │   │
│  │   browser: "Chrome 120.0",                           │   │
│  │   os: "Windows 10",                                  │   │
│  │   lastUsed: 2024-01-15T10:30:00Z,                    │   │
│  │   addedAt: 2024-01-15T10:30:00Z                      │   │
│  │ }                                                    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📧 Email Templates Overview

```
┌─────────────────────────────────────────────────────────────┐
│  Email Template 1: Verification Email                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Theme: Blue Gradient (from-blue-500 to-cyan-500)      │  │
│  │ Trigger: User registration                            │  │
│  │ Expiry: 24 hours                                      │  │
│  │                                                        │  │
│  │ Content:                                               │  │
│  │ • Shield logo 🛡️                                      │  │
│  │ • "Verify Your Email Address" heading                 │  │
│  │ • Large blue button with verification link            │  │
│  │ • Feature highlights                                   │  │
│  │ • Manual link fallback                                 │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Email Template 2: OTP Email                                 │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Theme: Red Gradient (from-red-500 to-rose-500)        │  │
│  │ Trigger: New device login                             │  │
│  │ Expiry: 10 minutes                                    │  │
│  │                                                        │  │
│  │ Content:                                               │  │
│  │ • Shield logo 🛡️                                      │  │
│  │ • "Security Alert" heading                            │  │
│  │ • Large 6-digit OTP code (42px font)                  │  │
│  │ • Device information box:                             │  │
│  │   - Browser: Chrome 120.0                             │  │
│  │   - OS: Windows 10                                    │  │
│  │   - Device: Desktop                                   │  │
│  │   - Time: 2024-01-15 10:30 AM                         │  │
│  │ • Security warning box (yellow border)                │  │
│  │ • Security tips                                        │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Email Template 3: Welcome Email                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Theme: Green Gradient (from-emerald-500 to-green-500) │  │
│  │ Trigger: Successful email verification                │  │
│  │                                                        │  │
│  │ Content:                                               │  │
│  │ • Shield logo 🛡️                                      │  │
│  │ • "Welcome to CyberVerse!" heading                    │  │
│  │ • Congratulations message                             │  │
│  │ • Feature boxes with icons                            │  │
│  │ • Quick start guide (4 steps)                         │  │
│  │ • "Start Learning Now" button                         │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Schema

```
┌─────────────────────────────────────────────────────────────┐
│  User Model (MongoDB)                                        │
│                                                               │
│  {                                                            │
│    // Basic Info                                             │
│    name: String,                                             │
│    email: String (unique),                                   │
│    password: String (hashed with bcrypt),                    │
│                                                               │
│    // Email Verification                                     │
│    isEmailVerified: Boolean (default: false),                │
│    emailVerificationToken: String (SHA-256 hash, hidden),    │
│    emailVerificationExpires: Date (24 hours),                │
│                                                               │
│    // Login OTP                                              │
│    loginOTP: String (SHA-256 hash, hidden),                  │
│    loginOTPExpires: Date (10 minutes),                       │
│                                                               │
│    // Trusted Devices                                        │
│    trustedDevices: [                                         │
│      {                                                        │
│        deviceId: String (SHA-256 hash),                      │
│        deviceName: String (e.g., "Windows Device"),          │
│        browser: String (e.g., "Chrome 120.0"),               │
│        os: String (e.g., "Windows 10"),                      │
│        lastUsed: Date,                                       │
│        addedAt: Date                                         │
│      }                                                        │
│    ],                                                         │
│                                                               │
│    // Other fields...                                        │
│    role: String,                                             │
│    points: Number,                                           │
│    completedLabs: Array,                                     │
│    achievements: Array,                                      │
│    createdAt: Date,                                          │
│    updatedAt: Date                                           │
│  }                                                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Security Features

```
┌─────────────────────────────────────────────────────────────┐
│  Security Measures                                           │
│                                                               │
│  1. Token Hashing (SHA-256)                                  │
│     ┌─────────────────────────────────────────────────┐     │
│     │ Plain Token → SHA-256 → Stored Hash             │     │
│     │ "abc123"   →  Hash()  → "a1b2c3d4e5f6..."       │     │
│     └─────────────────────────────────────────────────┘     │
│                                                               │
│  2. Time-Based Expiration                                    │
│     ┌─────────────────────────────────────────────────┐     │
│     │ Verification Token: 24 hours                    │     │
│     │ OTP Code: 10 minutes                            │     │
│     │ JWT Token: 7 days                               │     │
│     └─────────────────────────────────────────────────┘     │
│                                                               │
│  3. Device Fingerprinting                                    │
│     ┌─────────────────────────────────────────────────┐     │
│     │ User-Agent + IP → SHA-256 → Device ID           │     │
│     │ Prevents unauthorized device access             │     │
│     └─────────────────────────────────────────────────┘     │
│                                                               │
│  4. Password Hashing (bcrypt)                                │
│     ┌─────────────────────────────────────────────────┐     │
│     │ Plain Password → bcrypt → Stored Hash           │     │
│     │ Salt rounds: 10                                 │     │
│     └─────────────────────────────────────────────────┘     │
│                                                               │
│  5. Rate Limiting                                            │
│     ┌─────────────────────────────────────────────────┐     │
│     │ Max requests per IP: 100/15min                  │     │
│     │ Prevents brute force attacks                    │     │
│     └─────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 API Endpoints Summary

```
┌─────────────────────────────────────────────────────────────┐
│  Authentication Endpoints                                    │
│                                                               │
│  POST /api/auth/register                                     │
│  ├─ Body: { name, email, password }                          │
│  ├─ Response: { message, requiresVerification: true }        │
│  └─ Action: Send verification email                          │
│                                                               │
│  POST /api/auth/login                                        │
│  ├─ Body: { email, password }                                │
│  ├─ Response (Trusted): { token, user }                      │
│  ├─ Response (New): { requiresOTP, userId, deviceId }        │
│  └─ Action: Check device, send OTP if new                    │
│                                                               │
│  GET /api/auth/verify-email/:token                           │
│  ├─ Params: token                                            │
│  ├─ Response: { token, user, message }                       │
│  └─ Action: Verify email, auto-login, send welcome email     │
│                                                               │
│  POST /api/auth/verify-otp                                   │
│  ├─ Body: { userId, otp, deviceId }                          │
│  ├─ Response: { token, user, message }                       │
│  └─ Action: Verify OTP, add device to trusted list           │
│                                                               │
│  POST /api/auth/resend-verification                          │
│  ├─ Body: { email }                                          │
│  ├─ Response: { message }                                    │
│  └─ Action: Resend verification email                        │
│                                                               │
│  POST /api/auth/resend-otp                                   │
│  ├─ Body: { userId }                                         │
│  ├─ Response: { message }                                    │
│  └─ Action: Generate new OTP, send email                     │
└─────────────────────────────────────────────────────────────┘
```

---

**This diagram shows the complete flow of your email verification and OTP system!** 🚀