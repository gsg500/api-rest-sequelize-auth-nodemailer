const router = require('express').Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../../models/user');
const isAuthen = require('../../middlewares/isAuthenticated');
const authMail = require('../../middlewares/isTokenAuthSendMail');
const currentUser = require('../../middlewares/attachCurrentUser');
const attachMail = require('../../middlewares/attachSendMailUser');
const controller = require('../controller/user');
const upPassDds = require('../controller/updatePass');
const lgController = require('../controller/login');
const updName = require('../controller/updateUsename');
const dadosSendMail = require('../controller/sendMail');
const generateToken = require('../../config/jwt');
const generateMailToken = require('../../config/jwt.SendMail');
const genSerial = require('../../middlewares/genSerial');
const bodyParser = require('body-parser');
const emailSend = require('../../middlewares/isSendMail');
const jsonParser = bodyParser.json();
const salt_rounds = 10;

// Criar um novo usuário
router.post('/signup', jsonParser, controller, async (req, res) => {
	try {
		await UserModel.create(req.add_User);
		return res.status(201).json({msg: 'Usuario cadastrado com sucesso'});   
	} catch (err) { console.error(err);
		return res.status(500).json({ msg: JSON.stringify(err) });}
});

// Login
router.post('/login', jsonParser, lgController, async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await UserModel.findOne({ where: { e_mail: email } });
		if (!user || user.isDeleted === 'true') {
			return res.status(400).json({ msg: 'Usuario não cadastrado ou foi excluido' });
		} else if (await bcrypt.compare(password, user.passwordHash)){
			user.serialResetPass = genSerial(102), await user.save();
			const token = generateToken(user); return res.status(200).json({ token });
		} else {
			return res.status(401).json({ msg: 'Senha ou e-mail incorreto' });}
	} catch (err) { console.error(err);
		return res.status(500).json({ msg: JSON.stringify(err) });}
});

//Ateração nome de Usuario
router.patch('/update', isAuthen, currentUser, jsonParser, updName, async (req, res) => {
	try {
		const loggedInUser = req.currentUser; const { username } = req.body;
		const user = await UserModel.findOne({ where: { id: loggedInUser.id } });
		user.username = username; await user.save(); 
		return res.status(200).json('Nome alterado com sucesso');
	} catch (err) { console.error(err);
		return res.status(500).json({ msg: JSON.stringify(err) });}
});

// Buscar dados do usuário 
router.get('/profile', isAuthen, currentUser, (req, res) => {
	try {
		const loggedInUser = req.currentUser;
		if (loggedInUser) {
			return res.status(200).json({msg: 'Cadastro de usuario', id: loggedInUser.id,
				nome: loggedInUser.username, email: loggedInUser.e_mail });
		} else {
			return res.status(404).json({ msg: 'Usuário não encontrado.' });}
	} catch (err) { console.error(err);
		return res.status(500).json({ msg: JSON.stringify(err) });}
});

//Deletar usuario metodo soft Deleted
router.get('/del', isAuthen, currentUser, async (req, res) => {
	try {
		const loggedInUser = req.currentUser;
		const user = await UserModel.findOne({ where: { id: loggedInUser.id } });
		if (!user || user.isDeleted === 'true') {
			return res.status(400).json({ msg: 'Email não cadastrado ou o usuario ja foi excluido antes' });
		} else {
			user.isDeleted = 'true'; user.serialToken =  genSerial(103); 
			await user.save();
			return res.status(200).json({ msg: 'Usuario desativado com sucesso'});}
	} catch (err) { console.error(err);
		return res.status(500).json({ msg: JSON.stringify(err) });}
});

//Encerra sessão de usuario 
router.get('/logout', isAuthen, currentUser, async (req, res) => {
	try {
		const loggedInUser = req.currentUser;
		const user = await UserModel.findOne({ where: { id: loggedInUser.id } });
		if (!user || user.isDeleted === 'true') {
			return res.status(400).json({ msg: 'Email não cadastrado ou o usuario foi excluido' });
		} else {
			user.serialToken = genSerial(100); await user.save();
			return res.status(200).json({msg: 'Sessão encerrada com sucesso'});}
	} catch (err) { console.error(err);
		return res.status(500).json({ msg: JSON.stringify(err) });}
});

//Solicitação de redefinição de senha do usuario - Nodemail 
router.post('/send', jsonParser, dadosSendMail, async (req, res) => {
	try {
		const { email } = req.body;
		const user = await UserModel.findOne({ where: { e_mail: email } });
		if (user.isDeleted === 'false') {
			user.serialToken = genSerial(104); await user.save();
			const sendTokenMail = generateMailToken(user);
			await emailSend(user.e_mail, 'Redefinição de senha', sendTokenMail);
			return res.status(200).json('Email para redefinição de senha enviado');
		} else {
			return res.status(400).json({ msg: 'Usuário não encontrado.' });}
	} catch (err) { console.error(err);
		return res.status(500).json({ msg: JSON.stringify(err) });}
});

//Redefinicição de senha 
router.patch('/reset', jsonParser, authMail, attachMail, upPassDds, async (req, res) => {
	try {
		const loggedInUser = req.currentUser; const { email, password } = req.body;
		const user = await UserModel.findOne({ where: { id: loggedInUser.id, e_mail: email } });
		const salt = await bcrypt.genSalt(salt_rounds);
		const hashedPassword = await bcrypt.hash(password, salt);
		user.serialResetPass = genSerial(110); user.passwordHash = hashedPassword;
		await user.save(); return res.status(200).json('Senha alterada com sucesso');
	} catch (err) { console.error(err);
		return res.status(500).json({ msg: JSON.stringify(err) });}
});

module.exports = router;