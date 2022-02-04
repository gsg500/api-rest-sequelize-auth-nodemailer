const Sequelize = require('sequelize');
const database = require('../config/db');

const Componente = database.define('componente', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	gtin: {
		type: Sequelize.STRING,
		allowNull: false
	},
	nome: {
		type: Sequelize.STRING,
		allowNull: false
	},
	dimessoes_altura: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	dimessoes_largura: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	dimessoes_profundidade: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	peso_bruto: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	peso_liquido: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	grupo_id: {
		type: Sequelize.STRING,
		allowNull: false
	},
	seguimento_id: {
		type: Sequelize.STRING,
		allowNull: false
	},
	isDeleted: {
		type: Sequelize.STRING
	}
});

module.exports = Componente;