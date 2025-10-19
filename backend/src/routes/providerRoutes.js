const express = require('express');
const router = express.Router();
const controller = require('../controllers/providerController');
const auth = require('../middlewares/authMiddleware.js');

router.post('/', auth, controller.createProfile);
router.get('/', controller.getProviders);
router.put('/:id', auth, controller.updateProvider);
router.delete('/:id', auth, controller.deleteProvider);

module.exports = router;
