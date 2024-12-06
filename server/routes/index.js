const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const memberController = require('../controllers/memberController');
const { authenticate } = require('../middleware/auth');

// Auth routes
router.post('/register', authController.register);
// router.put('/update-role', authenticate, authController.updateUserRole);

router.post('/login', authController.login);

// Member routes (protected)
router.post(
	'/members',
	authenticate,
	memberController.uploadMiddleware,
	memberController.createMember
);
router.get('/members/:id', authenticate, memberController.getMember);
router.put(
	'/members/:id',
	authenticate,
	memberController.uploadMiddleware,
	memberController.updateMember
);
router.delete('/members/:id', authenticate, memberController.deleteMember);

module.exports = router;
