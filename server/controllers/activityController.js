const { ActivityLog, User, Role } = require('../models');

exports.getAllActivities = async (req, res) => {
	const page = req.query.page || 1;
	const perPage = req.query.perPage || 10;
	const offset = (page - 1) * perPage;

	const activities = await ActivityLog.findAll({
		include: [
			{
				model: User,
				attributes: ['id', 'email'],
				include: [
					{
						model: Role,
						attributes: ['name'],
					},
				],
			},
		],
		offset,
		limit: perPage,
	});

	res.set('X-Total-Count', activities.length);
	res.set('X-Page', page);
	res.set('X-Per-Page', perPage);

	res.json(activities);
};
