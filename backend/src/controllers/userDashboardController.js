const User = require('../models/User');
const SkillExchange = require('../models/SkillExchange');
const ServiceProvider = require('../models/ServiceProvider');
const Booking = require('../models/Booking');
const Message = require('../models/Message');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const updates = req.body;
    updates.updatedAt = new Date();
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user listings (skill exchanges)
exports.getUserSkillExchanges = async (req, res) => {
  try {
    const listings = await SkillExchange.find({ userId: req.user._id });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user’s service provider profile (if any)
exports.getUserServiceProvider = async (req, res) => {
  try {
    const provider = await ServiceProvider.findOne({ userId: req.user._id });
    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user bookings (both as user or provider)
exports.getUserBookings = async (req, res) => {
  try {
    let bookings;
    if (req.user.role === 'ServiceProvider') {
      bookings = await Booking.find({ providerId: req.user._id }).populate('userId', 'name email');
    } else {
      bookings = await Booking.find({ userId: req.user._id }).populate('providerId', 'name profession');
    }
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get conversation list or messages (optional: latest message per conversation)
exports.getUserMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ senderId: req.user._id }, { receiverId: req.user._id }]
    })
      .sort({ timestamp: -1 })
      .limit(50);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
