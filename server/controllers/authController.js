const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const { User, Role } = require('../models');
const { generateToken, logActivity } = require('../middleware/auth');

//Handle Registration
exports.register = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		const roleName =
			!req.body.roleName || req.body.roleName === ''
				? 'user'
				: req.body.roleName;

		// Find the role
		const role = await Role.findOne({
			where: { name: roleName.toLowerCase() },
		});

		if (!role) {
			return res.status(400).json({
				message: `Invalid role ${roleName}`,
			});
		}

		// Create user with role
		const user = await User.create({
			username,
			email,
			password,
			roleId: role.id,
		});

		await logActivity(
			user,
			'CREATE_USER',
			`Member ${username} created`,
			user.id
		);

		// Fetch the created user with role information
		const userWithRole = await User.findOne({
			where: { id: user.id },
			include: [
				{
					model: Role,
					as: 'Role',
					attributes: ['name'],
				},
			],
			attributes: { exclude: ['password'] },
		});

		const token = generateToken(userWithRole);

		res.status(201).json({
			message: 'User registered successfully',
			user: userWithRole,
			token,
		});
	} catch (error) {
		console.error('Registration error:', error);
		res.status(500).json({
			message: 'Error registering user',
			error: error.message,
		});
	}
};

exports.login = async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ where: { username } });

		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const isValidPassword = await bcrypt.compare(password, user.password);

		if (!isValidPassword) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const token = generateToken(user);

		console.log(user.id);
		await logActivity(user, 'LOGIN_USER', `User ${username} Loggedin`, user.id);

		res.status(200).json({
			message: 'Login successfull.',
			user,
			token,
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

//Export this form here
exports.refetchUser = async (req, res) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];

		if (!token) {
			return res.status(401).json({ message: 'Authentication required' });
		}

		const decoded = jwt.verify(token, JWT_SECRET);
		const user = await User.findByPk(decoded.id);

		if (!user) {
			return res.status(401).json({ message: 'User not found' });
		}

		await logActivity(
			user,
			'REFETCH_USER',
			` ${user.id} refetched data`,
			user.id
		);

		res.status(200).json({
			message: 'Refresh successfull.',
			user,
		});
	} catch (error) {
		res.status(401).json({ message: 'Invalid token' });
	}
};
