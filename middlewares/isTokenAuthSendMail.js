require('dotenv').config();
const jwt = require('express-jwt');

// eslint-disable-next-line no-unused-vars
function extractTokenFromHeaders(req, res) {
	if (!req.headers.authorization) {
		throw new Error('Missing Authorization Header.');
	}
	return req.headers.authorization.split(' ')[1];
}

module.exports = jwt({
	secret: process.env.TOKEN_SECRET_MAIL,
	userProperty: 'user',
	getToken: extractTokenFromHeaders,
	algorithms: ['HS256'],
});