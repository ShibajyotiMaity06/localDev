const mongoose = require('mongoose')
const schema = mongoose.Schema

const SkillExchangeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skillRequired: { type: String, required: true },
  skillOffered: { type: String, required: true },
  description: String,
  category: { type: String, enum: ['Coding', 'Art', 'Others'], default: 'Others' },
  location: String,
  status: { type: String, enum: ['Open', 'In Progress', 'Completed'], default: 'Open' },
  acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

module.exports = mongoose.model('SkillExchange', SkillExchangeSchema);
