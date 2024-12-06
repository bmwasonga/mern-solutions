const { User, Role, ActivityLog } = require('../models');

exports.upgradeToAdmin = async (req, res) => {
	try {
		const { userId } = req.params;

		// Find user and admin role
		const user = await User.findByPk(userId);
		const adminRole = await Role.findOne({ where: { name: 'admin' } });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		if (!adminRole) {
			return res
				.status(500)
				.json({ message: 'Admin role not found. Ensure roles are seeded.' });
		}

		// Update role to admin
		await user.update({ roleId: adminRole.id });

		await ActivityLog.create({
			userId: req.user.id,
			actionType: 'UPDATE',
			tableName: 'Users',
			recordId: user.id,
		});

		res.json({ message: 'User upgraded to admin', user });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
