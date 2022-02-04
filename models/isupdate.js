const Sequelize = require('sequelize');
const database = require('../config/db');

const isUpdate = database.define('isUpdate', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	tipo: { //Create, Update, Delete
		type: Sequelize.STRING,
		allowNull: false
	},
	componente_id: {
		type: Sequelize.STRING,
		allowNull: false
	}
});
 
module.exports = isUpdate;