const { User, Member, ActivityLog, Role, db } = require('../models');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: 'uploads/',
	filename: (req, file, cb) => {
		const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
		cb(
			null,
			`${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
		);
	},
});

const upload = multer({ storage });

exports.uploadMiddleware = upload.single('profilePicture');

exports.createMember = async (req, res) => {
	try {
		const { name, email, dateOfBirth } = req.body;
		const profilePicture = req.file?.path;

		const user = await authenticate(req, res);
		console.log(user.id);

		const member = await Member.create({
			name,
			email,
			dateOfBirth,
			profilePicture,
			createdById: user.id,
		});

		await logActivity(
			user,
			'CREATE_MEMBER',
			`Member ${name} created`,
			member.id
		);

		const createdMember = await Member.findOne({
			where: { id: member.id },
			include: [
				{
					model: User,
					as: 'creator',
					attributes: ['id', 'email'],
					include: [
						{
							model: Role,
							attributes: ['name'],
						},
					],
				},
			],
		});

		return res.status(201).json({
			status: 'success',
			data: createdMember,
		});
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

exports.getMember = async (req, res) => {
	try {
		const user = await authenticate(req, res);

		if (!user) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		const member = await Member.findByPk(req.params.id);
		if (!member) {
			return res.status(404).json({ message: 'Member not found' });
		}
		await logActivity(
			user,
			'FETCH_MEMBERS',
			`User ${user.name} fetched all members`,
			user.id
		);

		return res.json(member);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

exports.updateMember = async (req, res) => {
	try {
		const user = await authenticate(req, res);

		const member = await db.Member.findByPk(req.params.id);
		if (!member) {
			return res.status(404).json({ message: 'Member not found' });
		}

		const { name, email, dateOfBirth } = req.body;
		const profilePicture = req.file?.path;

		await logActivity(
			user,
			'UPDATE_MEMBER',
			`Member ${member} was updated by ${user.name}`,
			user.id
		);

		await member.update({
			name,
			email,
			dateOfBirth,
			...(profilePicture && { profilePicture }),
		});

		await logActivity(req.user, 'UPDATE', `Member ${name} updated`, member.id);

		return res.json(member);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

exports.deleteMember = async (req, res) => {
	try {
		const member = await db.Member.findByPk(req.params.id);
		if (!member) {
			return res.status(404).json({ message: 'Member not found' });
		}

		await member.destroy();

		await logActivity(
			req.user,
			'DELETE_MEMBER',
			`Member ${member.name} was deleted`,
			req.params.id
		);

		return res.status(204).send();
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
};

const authenticate = async (req, res) => {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) {
		return res.status(500).json({ message: 'Authentication required' });
	}
	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		const user = await User.findByPk(decoded.id);
		return user;
	} catch (error) {
		return res.status(500).json({ message: 'Invalid token' });
	}
};

// this should be later exported
exports.logActivity = async (user, actionType, details, recordId) => {
	await ActivityLog.create({
		userId: user.id,
		actionType,
		tableName: 'Members',
		recordId,
		details,
	});
};
