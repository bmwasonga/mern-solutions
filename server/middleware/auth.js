// middleware/auth.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const e = require('express');
const { logActivity } = require('../controllers/memberController');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

exports.generateToken = (user) => {
	return jwt.sign({ id: user.id, roleId: user.roleId }, JWT_SECRET, {
		expiresIn: '24h',
	});
};

exports.adminCheck = (req, res, next) => {
	if (req.user.roleId !== 'admin') {
		return res.status(403).json({ message: 'Admin privileges required' });
	}
	next();
};

exports.memberCheck = (req, res, next) => {
	if (req.user.roleId !== 'member') {
		return res.status(403).json({ message: 'Member privileges required' });
	}
	next();
};

exports.authenticate = async (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];

		if (!token) {
			return res.status(500).json({ message: 'Authentication required' });
		}

		const decoded = jwt.verify(token, JWT_SECRET);
		const user = await User.findByPk(decoded.id);

		if (!user) {
			return res.status(401).json({ message: 'User not found' });
		}

		req.user = user;
		next();
	} catch (error) {
		res.status(500).json({ message: 'Invalid token' });
	}
};

exports.refetchUser = async (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];

		if (!token) {
			return res.status(500).json({ message: 'Authentication required' });
		}

		const decoded = jwt.verify(token, JWT_SECRET);
		const user = await User.findByPk(decoded.id);

		if (!user) {
			return res.status(401).json({ message: 'User not found' });
		}
		// await logActivity(
		// 	req.user,
		// 	'REFETCH_USER',
		// 	` ${user.name} refetched data`,
		// 	req.params.id
		// );
		res.status(200).json({
			message: 'Refresh successfull.',
			user,
		});
	} catch (error) {
		res.status(500).json({ message: 'Invalid token' });
	}
};

// const createMember = async (req, res) => {
// 	const transaction = await sequelize.transaction();

// 	try {
// 		const { name, email, dateOfBirth, profilePicture } = req.body;

// 		const token = req.headers.authorization?.split(' ')[1];

// 		if (!token) {
// 			return res.status(500).json({ message: 'Authentication required' });
// 		}

// 		const decoded = jwt.verify(token, JWT_SECRET);
// 		const user = await User.findByPk(decoded.id);

// 		if (!user) {
// 			throw new Error('User not found');
// 		}

// 		if (!name || !email || !dateOfBirth) {
// 			throw new Error('Missing required fields');
// 		}

// 		const member = await db.Member.create(
// 			{
// 				name,
// 				email,
// 				dateOfBirth,
// 				profilePicture,
// 				createdById: user.id,
// 			},
// 			{ transaction }
// 		);

// 		await db.ActivityLog.create(
// 			{
// 				userId: user.id,
// 				memberId: member.id,
// 				action: 'CREATE_MEMBER',
// 				details: `Member ${name} created`,
// 			},
// 			{ transaction }
// 		);

// 		await transaction.commit();

// 		const createdMember = await db.Member.findOne({
// 			where: { id: member.id },
// 			include: [
// 				{
// 					model: db.User,
// 					as: 'creator',
// 					attributes: ['id', 'email'],
// 					include: [
// 						{
// 							model: db.Role,
// 							attributes: ['name'],
// 						},
// 					],
// 				},
// 			],
// 		});

// 		return res.status(201).json({
// 			status: 'success',
// 			data: createdMember,
// 		});
// 	} catch (error) {
// 		await transaction.rollback();
// 		return res.status(400).json({
// 			status: 'error',
// 			message: error.message,
// 		});
// 	}
// };

// module.exports = {
// 	createMember,
// };
