const jsonSeguimento = require('../../database/json/seguimento.json');

module.exports = async (req, res, next) => {
	try { const { nome_seguimento } = req.body;
		if (!nome_seguimento) { return res.status(400).json({ msg: JSON
			.stringify(err), msg: 'Veja modelo de arquivo esperado ->', jsonSeguimento });
		} else {return next();}        
	} catch (err) { console.error(err);
		return res.status(500).json({ msg: JSON
			.stringify(err), msg: 'Veja modelo de arquivo esperado ->', jsonSeguimento }); }
};  