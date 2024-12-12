const express = require('express');
const path = require('path');
const router = express.Router();
const authController = require('../controllers/authController');
const memberController = require('../controllers/memberController');
const { authenticate } = require('../middleware/auth');
const { getAllActivities } = require('../controllers/activityController');

// Auth routes
router.post('/register', authController.register);

router.post('/login', authController.login);
router.get('/refetch-user', authenticate, authController.refetchUser);

// Member routes (protected)
router.post(
	'/create-member',
	memberController.uploadMiddleware,
	memberController.createMember
);
router.get('/get-all-members', memberController.getAllMembers);
router.get('/getmember/:id', authenticate, memberController.getMember);
router.patch(
	'/member/:id',
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
router.delete('/member/:id', authenticate, memberController.deleteMember);

router.get('/activities', getAllActivities);

router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = router;
