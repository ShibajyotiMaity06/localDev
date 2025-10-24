const express = require('express');
const router = express.Router();
const controller = require('../controllers/userDashboardController');
const auth = require('../middlewares/authMiddleware');

router.get('/profile', auth, controller.getUserProfile);
router.put('/profile', auth, controller.updateUserProfile);

router.get('/skills', auth, controller.getUserSkillExchanges);
router.get('/service-provider', auth, controller.getUserServiceProvider);
router.get('/bookings', auth, controller.getUserBookings);
router.get('/messages', auth, controller.getUserMessages);

module.exports = router;
