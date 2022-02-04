const jsonLogin = require('../../database/json/login.json');

module.exports = async (req, res, next) => {
	try { 
		const { email, password } = req.body;        
		if (!email || !password) {
			return res.status(400)
				.json({msg: 'Arquivo invalido, veja modelo esperado ->', jsonLogin});
		} else {return next();}        
	} catch (err) {
		console.error(err);
		return res.status(500).json({ msg: JSON
			.stringify(err), msg: 'Veja modelo de arquivo esperado ->', jsonLogin });
	}
};    