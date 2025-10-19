const Message = require('../models/Message.js')

//sand massage
exports.sendMessage = async (req , res) => {
    try {
        const message = new Message({
            senderId : req.user._id,
            receiverId : req.body.receiverId,
            content : req.body.content 
        })

        const saved = await message.save()

        req.io.to(req.body.receiverId).emit('newMessage', saved);

        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log('error in sand mesage')
    }
}


// Get messages between two users
exports.getMessages = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const msgs = await Message.find({
      $or: [
        { senderId: req.user._id, receiverId },
        { senderId: receiverId, receiverId: req.user._id },
      ],
    }).sort({ createdAt: 1 });
    res.json(msgs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};