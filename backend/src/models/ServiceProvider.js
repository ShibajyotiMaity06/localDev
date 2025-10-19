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
        requred : true
    },
    hourlyRate : {
        type : Number,
        required : true
    },
    Rating : {
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
{timeStamps :true})

module.exports = mongoose.model('ServiceProvider' , ServiceProviderSchema)