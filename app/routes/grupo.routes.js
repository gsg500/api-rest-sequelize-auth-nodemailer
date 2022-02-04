const router = require('express').Router();
const GrupoModel = require('../../models/grupo');
const isAuthen = require('../../middlewares/isAuthenticated');
const currentUser = require('../../middlewares/attachCurrentUser');
const controller = require('../controller/grupo'); 
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

//Crud criar
router.post('/new', isAuthen, currentUser, jsonParser, controller, async (req, res) => {
	try {
		const result = await GrupoModel.create(req.body);
		res.status(201).json(result);
	} catch (err) { res.status(500).json(err); }
});
  
//Crud Listagem de grupos
router.get('/list', isAuthen, currentUser, async (req, res) => {
	try {
		const grupo = await GrupoModel.findAll({ where: { isDeleted: null }});  
		res.status(200).json(grupo);
	} catch (err) { res.status(500).json(err); }
});
  
//Crus Atualização 
router.patch('/update/:id', isAuthen, currentUser, jsonParser, controller, async (req, res) => {
	try {
		const grupo = await GrupoModel.findOne({ where: { id: req.params.id, isDeleted: null } });
		if (!grupo) {
			return res.status(404).json({ msg: 'Grupo não encontrado.' });
		} else {
			grupo.nome_grupo = req.body.nome_grupo; await grupo.save();
			res.status(200).json({msg: 'Grupo atualizado com sucesso.'});
		}
	} catch (err) {res.status(500).json({msg: 'Grupo não pode ser atualizado.'});}
}); 

//Crud deletar *soft-delete pelo id
router.patch('/del/:id', isAuthen, currentUser, async (req, res) => {
	try {
		const grupo = await GrupoModel.findOne({where: {id: req.params.id, isDeleted: null}});
		if (!grupo) {
			return res.status(404).json({ msg: 'Grupo não encontrado.' }); 
		} else {
			grupo.isDeleted = 'true'; await grupo.save();
			res.status(200).json({msg: 'Grupo Excluido com sucesso.'});
		}
	} catch (err) {res.status(500).json({msg: 'Erro grupo não pode ser excluido.'});}
}); 

module.exports = router;