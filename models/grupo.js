const Sequelize = require('sequelize');
const database = require('../config/db');

const Grupo = database.define('grupo', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	nome_grupo: {
		type: Sequelize.STRING,
		allowNull: false
	},
	isDeleted: {
		type: Sequelize.STRING
	}
});

module.exports = Grupo;