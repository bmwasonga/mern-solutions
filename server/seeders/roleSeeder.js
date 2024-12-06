const seedRoles = async (db) => {
	try {
		const { Role } = db;
		// Check if roles already exist
		const existingRoles = await Role.findAll();

		if (existingRoles.length === 0) {
			// Define the roles to be seeded
			const rolesToSeed = [
				{
					name: 'admin',
					description: 'Administrator with full access',
				},
				{
					name: 'user',
					description: 'Regular user with basic privileges',
				},
				{
					name: 'member',
					description: 'Member with some limited access',
				},
			];

			// Create all roles
			await Role.bulkCreate(rolesToSeed);
			console.log('Roles seeded successfully');
		} else {
			console.log('Roles already exist, skipping seeding');
		}
	} catch (error) {
		console.error('Error seeding roles:', error);
		throw error;
	}
};

module.exports = seedRoles;
