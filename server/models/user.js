const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
	const User = sequelize.define('User', {
		username: {
			type: DataTypes.STRING,
			unique: true,
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
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	User.associate = (models) => {
		User.belongsTo(models.Role, {
			foreignKey: 'roleId',
			as: 'role',
		});
	};

	User.beforeCreate(async (user) => {
		user.password = await bcrypt.hash(user.password, 10);
	});

	User.prototype.validatePassword = async function (password) {
		return bcrypt.compare(password, this.password);
	};

	return User;
};
