const UserModel = require('../../models/user');
const jsonUser = require('../../database/json/resetPassUser.json');

module.exports = async (req, res, next) => {
	try { 
		const { email, password } = req.body;
		const verificEmail = await UserModel.findOne({ where: { e_mail: email } });
		if (!verificEmail) {
			return res.status(400).json({
				msg: 'Email ja existe na base de dados'});
		} else if (!password || !password.match(
			/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
		)) { return res.status(400).json({
			msg: 'Senha deve ter no mínimo 8 caracteres, letras maiúsculas e minúsculas, números e caracteres especiais.'});
		} else {return next();}        
	} catch (err) { console.error(err);
		return res.status(500)
			.json({ msg: JSON.stringify(err), msg: 'Veja modelo de arquivo esperado ->', jsonUser });
	}
};    