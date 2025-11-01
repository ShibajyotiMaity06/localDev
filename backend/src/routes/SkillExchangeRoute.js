const express = require('express');
const router = express.Router();
const SkillExchangeController = require('../controllers/skillExchangeController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

router.post('/', authMiddleware, SkillExchangeController.createNewSkill);
router.get('/', SkillExchangeController.getSkillExchanges);
router.put('/:id/accept', authMiddleware, SkillExchangeController.acceptSkillExchange);
router.put('/:id', authMiddleware, SkillExchangeController.updateSkill);
router.delete('/:id', authMiddleware, SkillExchangeController.deleteSkill);
router.put('/:id/complete', authMiddleware, SkillExchangeController.completeSkillExchange);


module.exports = router;
