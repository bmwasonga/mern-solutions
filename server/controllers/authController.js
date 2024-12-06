const { User, Role } = require('../models');
const { generateToken } = require('../middleware/auth');

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

		if (!user || !(await user.validatePassword(password)))
			return res.status(401).json({ message: 'Invalid credentials' });

		const token = generateToken(user);
		// Send the token to the response
		res.status(200).json({
			message: 'Login successfull.',
			user: user,
			token,
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
