// middleware/auth.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const e = require('express');

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
		console.log('token', req.headers.authorization);

		if (!token) {
			return res.status(500).json({ message: 'Authentication required' });
		}

		const decoded = jwt.verify(token, JWT_SECRET);
		const user = await User.findByPk(decoded.id);

		if (!user) {
			return res.status(401).json({ message: 'User not found' });
		}
		res.status(200).json({
			message: 'Refresh successfull.',
			user: user,
		});
	} catch (error) {
		res.status(500).json({ message: 'Invalid token' });
	}
};
