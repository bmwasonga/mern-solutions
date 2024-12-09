const { faker } = require('@faker-js/faker');

const seedMembers = async (db) => {
	try {
		const { Member } = db;
		// Check if members already exist
		const existingMembers = await Member.findAll();

		if (existingMembers.length === 0) {
			const members = Array.from({ length: 1 }, (_, index) => ({
				id: index + 1,
				name: faker.internet.userName(),
				email: faker.internet.email(),
				phone: faker.phone.number(),
				dateOfBirth: faker.date
					.between({
						from: '1960-01-01',
						to: '2005-12-31',
					})
					.toISOString()
					.split('T')[0],
				profilePicture: `https://randomuser.me/api/portraits/${
					faker.number.int({ min: 0, max: 1 }) === 0 ? 'women' : 'men'
				}/${faker.number.int({ min: 1, max: 99 })}.jpg`,
				createdAt: new Date(),
				updatedAt: new Date(),
				createdById: faker.number.int({ min: 1, max: 2 }),
			}));

			// Create all members
			await Member.bulkCreate(members);
			console.log('Members seeded successfully');
		} else {
			console.log('Members already exist, skipping seeding');
		}
	} catch (error) {
		console.error('Error seeding members:', error);
		throw error;
	}
};

module.exports = seedMembers;
