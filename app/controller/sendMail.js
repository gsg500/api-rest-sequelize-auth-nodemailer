const UserModel = require('../../models/user');

module.exports = async (req, res, next) => {
	try { const { email } = req.body;
		const sendUser = await UserModel.findOne({ where: { e_mail: email } });        
		if (sendUser) {                 
			return next();
		} else {return res.status(400)
			.json({ msg: JSON.stringify(err), msg: 'Email não encontrado'});}        
	} catch (err) { console.error(err);
		return res.status(500)
			.json({ msg: JSON.stringify(err), msg: 'Não Email não encontrado'});
	}
};  