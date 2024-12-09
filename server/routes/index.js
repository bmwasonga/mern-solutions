const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const memberController = require('../controllers/memberController');
const { authenticate, refetchUser } = require('../middleware/auth');

// Auth routes
router.post('/register', authController.register);
// router.put('/update-role', authenticate, authController.updateUserRole);

router.post('/login', authController.login);
router.get('/refetch-user', refetchUser);

// Member routes (protected)
router.post(
	'/create-member',
	memberController.uploadMiddleware,
	memberController.createMember
);
router.get('/getmember/:id', authenticate, memberController.getMember);
router.put(
	'/members/:id',
	authenticate,
	memberController.uploadMiddleware,
	memberController.updateMember
);
router.post(
	'/update-member',
	authenticate,
	memberController.uploadMiddleware,
	memberController.updateMember
);
router.delete('/members/:id', authenticate, memberController.deleteMember);

module.exports = router;
