const jsonComponente = require('../../database/json/componente.json');
const componenteModel = require('../../models/componente');
module.exports = async (req, res, next) => {
	try { 
		const componente = await componenteModel.findOne({ where: { id: req.params.id, isDeleted: null } });
		if (!componente) {
			return res.status(404).json({ msg: 'Componente não encontrado.' });
     
		} else {
			componente.isDeleted = 'true';
			req.add_isUpdate = {tipo: 'Delete', componente_id: componente.id};
			req.del_componente = componente;
			return next();}

	} catch (err) { console.error(err);
		return res.status(500).json({ msg: JSON
			.stringify(err), msg: JSON.stringify(err), msg: 'Arquivo invalido, modelo esperado->', jsonComponente}); }
};