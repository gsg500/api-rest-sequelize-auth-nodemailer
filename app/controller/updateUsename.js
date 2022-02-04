const jsonUser = require('../../database/json/updateUsename.json');

module.exports = async (req, res, next) => {
	try { const { username } = req.body;
		if (!username) { return res.status(400).json({ msg: JSON
			.stringify(err), msg: 'Veja modelo de arquivo esperado ->', jsonUser });
		} else {return next();}        
	} catch (err) { console.error(err);
		return res.status(500)
			.json({ msg: JSON
				.stringify(err), msg: 'Veja modelo de arquivo esperado ->', jsonUser }); }
}; 