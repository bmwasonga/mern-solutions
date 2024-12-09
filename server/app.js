const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const db = require('./models');
const path = require('path');
const seedRoles = require('./seeders/roleSeeder');
const seedMembers = require('./seeders/memberSeeder');

const app = express();

// Configure CORS to allow requests from the frontend
app.use(
	cors({
		origin: 'http://localhost:5173',
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', routes);

// Initialize database, seed roles, and start server
const PORT = process.env.PORT || 3001;

db.sequelize.sync().then(async () => {
	try {
		// Seed roles after database sync
		await seedRoles(db);
		// await seedMembers(db);

		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	} catch (error) {
		console.error('Failed to seed roles:', error);
		process.exit(1);
	}
});
