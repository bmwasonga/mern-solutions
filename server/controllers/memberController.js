const { Member, ActivityLog } = require('../models');
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

		const member = await Member.create({
			name,
			email,
			dateOfBirth,
			profilePicture,
			createdBy: req.user.id,
		});

		await ActivityLog.create({
			userId: req.user.id,
			actionType: 'CREATE',
			tableName: 'Members',
			recordId: member.id,
		});

		res.status(201).json(member);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.getMember = async (req, res) => {
	try {
		const member = await Member.findByPk(req.params.id);
		if (!member) {
			return res.status(404).json({ message: 'Member not found' });
		}
		res.json(member);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.updateMember = async (req, res) => {
	try {
		const member = await Member.findByPk(req.params.id);
		if (!member) {
			return res.status(404).json({ message: 'Member not found' });
		}

		const { name, email, dateOfBirth } = req.body;
		const profilePicture = req.file?.path;

		await member.update({
			name,
			email,
			dateOfBirth,
			...(profilePicture && { profilePicture }),
		});

		await ActivityLog.create({
			userId: req.user.id,
			actionType: 'UPDATE',
			tableName: 'Members',
			recordId: member.id,
		});

		res.json(member);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.deleteMember = async (req, res) => {
	try {
		const member = await Member.findByPk(req.params.id);
		if (!member) {
			return res.status(404).json({ message: 'Member not found' });
		}

		await member.destroy();

		await ActivityLog.create({
			userId: req.user.id,
			actionType: 'DELETE',
			tableName: 'Members',
			recordId: req.params.id,
		});

		res.status(204).send();
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
