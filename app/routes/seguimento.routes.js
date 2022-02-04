const router = require('express').Router();
const SeguimentoModel = require('../../models/seguimento');
const isAuthen = require('../../middlewares/isAuthenticated');
const currentUser = require('../../middlewares/attachCurrentUser');
const controller = require('../controller/seguimento'); 
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

//Crud criar
router.post('/new', isAuthen, currentUser, jsonParser, controller, async (req, res) => {
	try {
		const result = await SeguimentoModel.create(req.body);
		res.status(201).json(result);
	} catch (err) { res.status(500).json(err); }
});
  
//Crud Listagem 
router.get('/list', isAuthen, currentUser, async (req, res) => {
	try {
		const seguimento = await SeguimentoModel.findAll({ where: { isDeleted: null }});  
		res.status(200).json(seguimento);
	} catch (err) { res.status(500).json(err); }
});
  
//Crus Atualização 
router.patch('/update/:id', isAuthen, currentUser, jsonParser, controller, async (req, res) => {
	try {
		const seguimento = await SeguimentoModel.findOne({where: {id: req.params.id, isDeleted: null}});
		if (!seguimento) {
			return res.status(404).json({ msg: 'Seguimento não encontrado.' });
		} else {
			seguimento.nome_seguimento = req.body.nome_seguimento; await seguimento.save();
			res.status(200).json({msg: 'Seguimento atualizado com sucesso.'}); 
		}
	} catch (err) { res.status(500).json({msg: 'Seguimento não pode ser atualizado.'}); }
}); 

//Crud deletar *soft-delete pelo id
router.patch('/del/:id', isAuthen, currentUser, async (req, res) => {
	try {
		const seguimento = await SeguimentoModel.findOne({where: { id: req.params.id, isDeleted: null }});
		if (!seguimento) {
			return res.status(404).json({ msg: 'Seguimento não encontrado.' }); 
		} else {
			seguimento.isDeleted = 'true'; await seguimento.save();
			res.status(200).json({msg: 'Seguimento Excluido com sucesso.'}); 
		}
	} catch (err) { res.status(500).json({msg: 'Erro seguimento não pode ser excluido.'}); }
}); 

module.exports = router;