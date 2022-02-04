const jsonGrupo = require('../../database/json/grupo.json');

module.exports = async (req, res, next) => {
	try { const { nome_grupo } = req.body;
		if (!nome_grupo) { return res.status(400).json({ msg: JSON
			.stringify(err), msg: 'Veja modelo de arquivo esperado ->', jsonGrupo });
		} else {return next();}        
	} catch (err) { console.error(err);
		return res.status(500).json({ msg: JSON
			.stringify(err), msg: 'Veja modelo de arquivo esperado ->', jsonGrupo }); }
};     