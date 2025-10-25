const express = require('express');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Update user progress after room/lab completion
router.post('/update', auth, async (req, res) => {
  try {
    const { type, itemId, points, timeSpent } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update user points and level
    user.points += points;
    
    // Calculate new level (every 1000 points = 1 level)
    const newLevel = Math.floor(user.points / 1000) + 1;
    const leveledUp = newLevel > user.level;
    user.level = newLevel;

    // Update completion count
    if (type === 'room') {
      user.completedRooms += 1;
      user.roomProgress.push({
        roomId: itemId,
        completed: true,
        completedAt: new Date(),
        score: points
      });
    } else if (type === 'lab') {
      user.completedLabs += 1;
      user.labProgress.push({
        labId: itemId,
        completed: true,
        completedAt: new Date(),
        score: points
      });
    }

    await user.save();

    // Calculate new rank
    const rank = await user.calculateRank();

    res.json({
      success: true,
      data: {
        points: user.points,
        level: user.level,
        rank,
        leveledUp,
        completedLabs: user.completedLabs,
        completedRooms: user.completedRooms
      }
    });
  } catch (error) {
    console.error('Progress update error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get leaderboard (public endpoint)
router.get('/leaderboard', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const leaderboard = await User.find({ isActive: true })
      .select('name points level completedLabs completedRooms avatar')
      .sort({ points: -1, completedLabs: -1, completedRooms: -1 })
      .limit(parseInt(limit));

    // Add rank to each user
    const leaderboardWithRank = leaderboard.map((user, index) => ({
      ...user.toObject(),
      rank: index + 1
    }));

    res.json({
      success: true,
      data: leaderboardWithRank
    });
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get user's current rank and stats
router.get('/stats', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('name points level completedLabs completedRooms');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const rank = await user.calculateRank();
    const totalUsers = await User.countDocuments({ isActive: true });

    res.json({
      success: true,
      data: {
        ...user.toObject(),
        rank,
        totalUsers
      }
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;