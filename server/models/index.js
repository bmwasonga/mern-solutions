const { Sequelize } = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	{
		host: config.host,
		dialect: 'sqlite',
		storage: './database.sqlite',
	}
);

const db = {};
db.sequelize = sequelize;

// Import models
db.User = require('./user')(sequelize);
db.Role = require('./role')(sequelize);
db.Member = require('./member')(sequelize);
db.ActivityLog = require('./activityLog')(sequelize);

// Define relationships

db.User.belongsTo(db.Role, { foreignKey: 'roleId' });
db.Role.hasMany(db.User, { foreignKey: 'roleId' });

db.Member.belongsTo(db.User, { foreignKey: 'createdById', as: 'creator' });
db.User.hasMany(db.Member, { foreignKey: 'createdById', as: 'createdMembers' });

db.ActivityLog.belongsTo(db.User, { foreignKey: 'userId' });
db.ActivityLog.belongsTo(db.Member, { foreignKey: 'memberId' });
db.User.hasMany(db.ActivityLog, { foreignKey: 'userId' });
db.Member.hasMany(db.ActivityLog, { foreignKey: 'memberId' });

module.exports = db;
