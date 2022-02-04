const UserModel = require('../models/user');

module.exports = async (req, res, next) => {
	try {
		const loggedInUser = req.user;
		const user = await UserModel.findOne( {where: { id: loggedInUser.id, serialToken: loggedInUser.serialToken, e_mail: loggedInUser.e_mail}} );
		if (!user) {
			return res
				.status(400)
				.json({ msg: 'Sessão encerrada, gere novo token' });
		}
		req.currentUser = user;
		return next();
	} catch (err) {
		console.error(err);
		return res.status(500).json({ msg: JSON.stringify(err) });
	}
};