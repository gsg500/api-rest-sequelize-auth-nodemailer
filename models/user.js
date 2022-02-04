const Sequelize = require('sequelize');
const database = require('../config/db');

const User = database.define('user', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false
	},
	e_mail: {
		type: Sequelize.STRING,
		allowNull: false
	},
	passwordHash: {
		type: Sequelize.STRING,
		allowNull: false
	},
	isDeleted: {
		type: Sequelize.STRING
	},
	serialToken: {  
		type: Sequelize.STRING
	},
	serialResetPass: {   
		type: Sequelize.STRING
	}
});

module.exports = User;