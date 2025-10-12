const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/leaderboard
// @desc    Get leaderboard
// @access  Public
router.get('/leaderboard', async (req, res) => {
  try {
    const { limit = 10, type = 'global' } = req.query;
    
    let dateFilter = {};
    if (type === 'weekly') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      dateFilter = { updatedAt: { $gte: weekAgo } };
    } else if (type === 'monthly') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      dateFilter = { updatedAt: { $gte: monthAgo } };
    }

    const users = await User.find(dateFilter)
      .select('name points level completedLabs isPremium')
      .sort({ points: -1 })
      .limit(parseInt(limit));

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      username: user.name,
      points: user.points,
      level: user.level,
      completedLabs: user.completedLabs,
      isPremium: user.isPremium
    }));

    res.json({ leaderboard });
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, [
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { name, avatar } = req.body;
    const updateData = {};
    
    if (name) updateData.name = name;
    if (avatar) updateData.avatar = avatar;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isPremium: user.isPremium,
        level: user.level,
        points: user.points,
        completedLabs: user.completedLabs,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/complete-lab
// @desc    Mark lab as completed and update points
// @access  Private
router.post('/complete-lab', auth, [
  body('labId').notEmpty().withMessage('Lab ID is required'),
  body('score').isNumeric().withMessage('Score must be a number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { labId, score } = req.body;
    const user = req.user;

    // Check if lab already completed
    const existingProgress = user.labProgress.find(p => p.labId === labId);
    if (existingProgress && existingProgress.completed) {
      return res.status(400).json({ message: 'Lab already completed' });
    }

    // Update lab progress
    if (existingProgress) {
      existingProgress.completed = true;
      existingProgress.completedAt = new Date();
      existingProgress.score = score;
    } else {
      user.labProgress.push({
        labId,
        completed: true,
        completedAt: new Date(),
        score
      });
    }

    // Update user stats
    user.completedLabs += 1;
    user.points += score;
    
    // Level up logic (every 1000 points = 1 level)
    const newLevel = Math.floor(user.points / 1000) + 1;
    if (newLevel > user.level) {
      user.level = newLevel;
    }

    await user.save();

    res.json({
      message: 'Lab completed successfully',
      user: {
        id: user._id,
        points: user.points,
        level: user.level,
        completedLabs: user.completedLabs
      }
    });
  } catch (error) {
    console.error('Complete lab error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;