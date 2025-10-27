const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

router.get('/verify', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});


module.exports = router;
