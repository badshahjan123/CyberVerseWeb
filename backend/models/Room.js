const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Room name is required'],
    trim: true,
    maxlength: [100, 'Room name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Room description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    required: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Web Security', 'Network Security', 'Cryptography', 'Forensics', 'Reverse Engineering', 'OSINT', 'Mobile Security', 'Cloud Security']
  },
  points: {
    type: Number,
    required: true,
    min: [10, 'Points must be at least 10'],
    max: [1000, 'Points cannot exceed 1000']
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  completedBy: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    score: Number
  }],
  tags: [String],
  estimatedTime: {
    type: Number, // in minutes
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for better performance
roomSchema.index({ category: 1, difficulty: 1 });
roomSchema.index({ isActive: 1, isPremium: 1 });

module.exports = mongoose.model('Room', roomSchema);