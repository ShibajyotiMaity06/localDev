const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    providerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'ServiceProvider',
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    timeSlot : String,
    status: { type: String, enum: ['Pending', 'Accepted', 'Declined', 'Completed'], default: 'Pending' },
    message : String
} , {timestamps : true})

module.exports = mongoose.model('Booking' , BookingSchema)