const express = require('express');
const router = express.Router();
const controller = require('../controllers/messageController');
const auth = require('../middlewares/authMiddleware.js');

router.post('/', auth, controller.sendMessage);
router.get('/:receiverId', auth, controller.getMessages);

module.exports = router;
