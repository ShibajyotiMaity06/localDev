const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookingController');
const auth = require('../middlewares/authMiddleware.js')

router.post('/', auth, controller.createBooking);
router.get('/', auth, controller.getBookings);
router.put('/:id', auth, controller.updateBookingStatus);

module.exports = router;
