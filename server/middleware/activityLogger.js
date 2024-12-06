const { ActivityLog } = require('../models');

const logActivity = (entityType) => async (req, res, next) => {
	const originalJson = res.json;

	res.json = async function (data) {
		try {
			await ActivityLog.create({
				userId: req.user.id,
				actionType: getActionType(req.method),
				entityType,
				entityId: data.id || req.params.id,
				details: {
					changes: req.body,
					result: data,
				},
				ip: req.ip,
			});
		} catch (error) {
			console.error('Activity logging failed:', error);
		}
		return originalJson.call(this, data);
	};

	next();
};

const getActionType = (method) => {
	const types = {
		GET: 'READ',
		POST: 'CREATE',
		PUT: 'UPDATE',
		DELETE: 'DELETE',
	};
	return types[method] || 'READ';
};

module.exports = { logActivity };
