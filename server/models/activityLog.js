const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const ActivityLog = sequelize.define('ActivityLog', {
		actionType: {
			type: DataTypes.ENUM('CREATE', 'READ', 'UPDATE', 'DELETE'),
			allowNull: false,
		},
		entityType: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		entityId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		details: {
			type: DataTypes.JSON,
			allowNull: true,
		},
		ip: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	});

	return ActivityLog;
};
