const jsonComponente = require('../../database/json/componente.json');
const grupoModel = require('../../models/grupo');
const seguimentoModel = require('../../models/seguimento');

module.exports = async (req, res, next) => {
	try { const { gtin, nome, dimessoes_altura, dimessoes_largura, dimessoes_profundidade,
		peso_bruto, peso_liquido, grupo_id, seguimento_id } = req.body;
	const grupo = await grupoModel.findOne({ where: { id: grupo_id, isDeleted: null }});
	const seguimento = await seguimentoModel.findOne({ where: { id: seguimento_id, isDeleted: null }});   
	if (!grupo || !seguimento || !gtin || !nome || typeof dimessoes_altura !== 'number'
      || typeof dimessoes_largura !== 'number' || typeof dimessoes_profundidade !== 'number'
      || typeof peso_bruto !== 'number' || typeof peso_liquido !== 'number'
      || typeof grupo_id !== 'number' || typeof seguimento_id !== 'number') {
		return res.status(400)
			.json({msg: 'Arquivo invalido, veja lista de grupos e seguimentos disponiveis,  modelo esperado ->', jsonComponente});
	} else {return next();}         
	} catch (err) { console.error(err);
		return res.status(500).json({
			msg: JSON.stringify(err), msg: 'Arquivo invalido, modelo esperado->', jsonComponente});
	}
};