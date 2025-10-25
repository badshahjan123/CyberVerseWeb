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
  match: [
    /^(?=.*[A-Z]).+$/,
    'Password must contain at least one uppercase letter'
  ],
  select: false
},
  isPremium: {
    type: Boolean,
    default: false
  },
  premiumSubscription: {
    plan: String,
    startDate: Date,
    transactionId: String,
    paymentMethod: String,
    amount: String,
    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired'],
      default: 'active'
    },
    cancelledAt: Date
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
  completedRooms: {
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
  roomProgress: [{
    roomId: String,
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

  authProvider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  }
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



module.exports = mongoose.model('User', userSchema);