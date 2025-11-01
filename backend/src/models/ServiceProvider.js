const mongoose = require('mongoose')

const ServiceProviderSchema = new mongoose.Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    name : {
        type:String,
        required:true
    },
    profession : {
        type:String,
        required:true
    },
    phone : {
        type : String ,
        required : true
    },
    hourlyRate : {
        type : Number,
        required : true
    },
    rating : {
        type : Number,
        default : 0
    },
    status: {
        type:String  , enum : ['Available' , 'Busy'] , default : 'Available'
    },
    bio : String,
    calender : [
        {date : String,
        available : {type : Boolean , default : true}}
    ]
 , },
{timestamps :true})

module.exports = mongoose.model('ServiceProvider' , ServiceProviderSchema)