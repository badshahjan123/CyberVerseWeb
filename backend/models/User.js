const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  level: {
    type: Number,
    default: 1
  },
  points: {
    type: Number,
    default: 0
  },
  completedLabs: {
    type: Number,
    default: 0
  },
  achievements: [{
    name: String,
    description: String,
    earnedAt: {
      type: Date,
      default: Date.now
    }
  }],
  labProgress: [{
    labId: String,
    completed: Boolean,
    completedAt: Date,
    score: Number
  }],
  avatar: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
    select: false
  },
  emailVerificationExpires: {
    type: Date,
    select: false
  },
  loginOTP: {
    type: String,
    select: false
  },
  loginOTPExpires: {
    type: Date,
    select: false
  },
  trustedDevices: [{
    deviceId: String,
    deviceName: String,
    browser: String,
    os: String,
    lastUsed: Date,
    addedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Calculate user rank
userSchema.methods.calculateRank = async function() {
  const User = this.constructor;
  const rank = await User.countDocuments({ points: { $gt: this.points } }) + 1;
  return rank;
};

// Generate email verification token
userSchema.methods.generateEmailVerificationToken = function() {
  const crypto = require('crypto');
  const token = crypto.randomBytes(32).toString('hex');
  
  this.emailVerificationToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  
  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  
  return token;
};

// Generate login OTP
userSchema.methods.generateLoginOTP = function() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  
  const crypto = require('crypto');
  this.loginOTP = crypto
    .createHash('sha256')
    .update(otp)
    .digest('hex');
  
  this.loginOTPExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  return otp;
};

// Check if device is trusted
userSchema.methods.isTrustedDevice = function(deviceId) {
  return this.trustedDevices.some(device => device.deviceId === deviceId);
};

// Add trusted device
userSchema.methods.addTrustedDevice = function(deviceInfo) {
  // Check if device already exists
  const existingDevice = this.trustedDevices.find(
    device => device.deviceId === deviceInfo.deviceId
  );
  
  if (existingDevice) {
    existingDevice.lastUsed = Date.now();
  } else {
    this.trustedDevices.push({
      ...deviceInfo,
      lastUsed: Date.now()
    });
  }
};

module.exports = mongoose.model('User', userSchema);