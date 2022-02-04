const Sequelize = require('sequelize');
const database = require('../config/db');

const Seguimento = database.define('seguimento', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	nome_seguimento: {
		type: Sequelize.STRING,
		allowNull: false
	},
	isDeleted: {
		type: Sequelize.STRING
	}  
});

module.exports = Seguimento;