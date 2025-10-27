const Booking = require('../models/Booking.js')

const {sendNotification} = require('../utils/notification.js')


exports.createBooking = async (req , res) => {
    try {
        const booking = new Booking({...req.body , userId : req.user._id})
        const savedBooking = await booking.save()

        sendNotification(booking.providerId , `new booking req from ${req.user._id}`)

        res.status(201).json(savedBooking)
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log('createbooking mei dikkat hai baba')
    }
}

exports.getBookings = async (req, res) => {
  try {
    const { role } = req.query;
    const filter = role === 'provider' ? { providerId: req.user._id } : { userId: req.user._id };
    const bookings = await Booking.find(filter).populate('providerId userId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    sendNotification(booking.userId, `Your booking status updated to ${booking.status}`);

    sendNotification(booking.providerId, `Booking status changed to ${booking.status}`);

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};