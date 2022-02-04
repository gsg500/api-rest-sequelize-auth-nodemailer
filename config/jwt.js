require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function generateToken(user) {

	const { id, username, e_mail, serialToken } = user;
	const signature = process.env.TOKEN_SIGN_SECRET;
	const expiration = '3h';

	return jwt.sign({ id, username, e_mail, serialToken }, signature, {
		expiresIn: expiration,
	});
};