const { ActivityLog } = require('../models');

class ActivityLogger {
	static async log(userId, action, table, recordId) {
		return await ActivityLog.create({
			userId,
			actionType: action,
			tableName: table,
			recordId,
		});
	}

	static async getActivities(filters = {}) {
		return await ActivityLog.findAll({
			where: filters,
			include: ['User'],
			order: [['createdAt', 'DESC']],
		});
	}
}
