const bcrypt = require('bcryptjs');
const UserModel = require('../../models/user');
const jsonUser = require('../../database/json/usuario.json');
const genSerial = require('../../middlewares/genSerial');
const salt_rounds = 10;

module.exports = async (req, res, next) => {
	try { 
		const { username, email, password } = req.body;
		const verificEmail = await UserModel.findOne({ where: { e_mail: email } });
		if (verificEmail) {
			return res.status(400).json({ msg: 'Email ja existe na base de dados'});
		} else if (!password || !password.match(
			/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
		)) { return res.status(400).json({
			msg: 'Senha deve ter no mínimo 8 caracteres, letras maiúsculas e minúsculas, números e caracteres especiais.'});
		} else if (!username || !email){
			return res.status(400).json({msg: 'Arquivo invalido, veja modelo esperado ->', jsonUser});
		} else {     
			const salt = await bcrypt.genSalt(salt_rounds);
			const hashedPassword = await bcrypt.hash(password, salt);
			req.add_User = { username: username, e_mail: email,
				passwordHash: hashedPassword, serialToken: genSerial(99),
				isDeleted: 'false', serialResetPass: genSerial(101)};          
			return next();
		}        
	} catch (err) {
		console.error(err);
		return res.status(500).json({ msg: JSON.stringify(err), msg:'Erro Veja modelo de arquivo esperado ->', jsonUser });
	}
};    