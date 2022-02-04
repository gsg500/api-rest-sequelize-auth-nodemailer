const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = async function emailSend(user, titulo, conteudo) {
	try { const transporter = nodemailer.createTransport({
		host: process.env.SMTP_CONFIG_host, port: process.env.SMTP_CONFIG_port,
		secure: false, // Objetivo aqui é apenas uma prova de conceito
		auth: { user: process.env.SMTP_CONFIG_user, pass: process.env.SMTP_CONFIG_pass },
		tls: { rejectUnauthorized: false }});          
	const mailSend = await transporter.sendMail({
		text: `http://ULR-DO-FRONTEND/user/reset/${conteudo}`,
		subject: titulo,
		from: process.env.EMAIL, 
		to: user}); 
	return mailSend;
	} catch (err) { console.error(err);
		return res.status(500).json({ msg: JSON.stringify(err) }); }  
};