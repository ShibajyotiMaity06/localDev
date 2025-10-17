const mongoose = require('mongoose')
const schema = mongoose.Schema

const SkillExchangeSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    skillRequired : {
        type : String,
        required:true
    },
    skillOffered : {
        type : String,
        required : true
    },
    description : String,
    Category : String , enum : ['Coding' , 'Art' , 'Others'], default:'Others',
    location : String,   // virtual or inperson,
    status: {
    type: String,
    enum: ['Open',  'Completed'],
    default: 'Open'
  },

} , {timestamps:true})


model.exports = mongoose.model('SkillExchange' , SkillExchangeSchema)