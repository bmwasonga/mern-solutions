const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	return sequelize.define('Member', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				isEmail: true,
			},
		},
		dateOfBirth: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		profilePicture: {
			type: DataTypes.STRING,
		},
	});
};
