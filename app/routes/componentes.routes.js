const router = require('express').Router();
const ComponenteModel = require('../../models/componente');
const IsUpdateModel = require('../../models/isupdate');
const isAuthen = require('../../middlewares/isAuthenticated');
const currentUser = require('../../middlewares/attachCurrentUser');
const controller = require('../controller/componente'); 
const upController = require('../controller/upComponente'); 
const delController = require('../controller/delComponente'); 
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

//C-Crud criar 
router.post('/new', isAuthen, currentUser, controller, jsonParser, async (req, res) => {
	try {
		const result = await ComponenteModel.create(req.body);
		res.status(201).json(result);
	} catch (err) { res.status(500).json(err); }
});
  
//R-Crud Listagem
router.get('/list', isAuthen, currentUser, async (req, res) => {
	try {
		const componente = await ComponenteModel.findAll({ where: { isDeleted: null }});  
		res.status(200).json(componente);
	} catch (err) { res.status(500).json(err); }
});
  
//R-Crud detalhes da tabela de controle isUpdate
router.get('/details/:id', isAuthen, currentUser, async (req, res) => {
	try {
		const componente = await ComponenteModel.findOne({ id: req.params.id, isDeleted: null }); 
		const is_update = await IsUpdateModel.findAll({ where: {componente_id: componente.id} });
		if (!componente || !is_update) {
			return res.status(404).json({ msg: 'Não foram encontrados registros.' });
		} else { res.status(200).json(is_update); }
	} catch (err) { res.status(500).json(err); }
});  

//U-Crud alteração dados componente
router.patch('/update/:id', isAuthen, currentUser, jsonParser, upController, async (req, res) => {
	try { 
		await req.up_componente.save();
		await IsUpdateModel.create(req.add_isUpdate);
		res.status(200).json({msg: 'Componente atualizado com sucesso.'}); 
	} catch (err) { res.status(500).json({msg: 'Componente não pode ser atualizado.'}); }
}); 

//D-Crud deletar *soft-delete pelo id
router.patch('/del/:id', isAuthen, currentUser, delController, async (req, res) => {
	try { 
		await req.del_componente.save();
		await IsUpdateModel.create(req.add_isUpdate);
		res.status(200).json({msg: 'Componente Excluido com sucesso.'}); 
	} catch (err) { res.status(500)
		.json({msg: 'Erro componente não pode ser excluido.'}); }
}); 

module.exports = router;