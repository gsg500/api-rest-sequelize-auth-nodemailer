require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function generateToken(user) {

	const { e_mail, serialResetPass } = user;
	const signature = process.env.TOKEN_SECRET_MAIL;
	const expiration = 500;

	return jwt.sign({ e_mail, serialResetPass }, signature, {
		expiresIn: expiration,
	});
};