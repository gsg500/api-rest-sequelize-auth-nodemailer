const router = require('express').Router();
const isAuthen = require('../../middlewares/isAuthenticated');
const currentUser = require('../../middlewares/attachCurrentUser');
const controller = require('../controller/cubagem');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.post('/cubagem', isAuthen, currentUser, jsonParser, controller, async (req, res) => {  
	try { 
		if (req.volume <= 0 || req.bruto  <= 0 || req.liquido <= 0) {
			res.status(400).json({msg: 'Informações invalidas ou componente indisponivel'});  
		} else {
			res.status(200)
				.json({'cubagem': req.volume, 'pesoBruto': req.bruto, 'pesoLiquido': req.liquido});}
	} catch (err) {
		res.status(500).json(err);
	}  
});

module.exports = router;