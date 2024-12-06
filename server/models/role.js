const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	const Role = sequelize.define('Role', {
		name: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
	});

	Role.hasMany(sequelize.models.User, {
		foreignKey: 'roleId',
	});

	return Role;
};
