async function synchronization() {
	try { 
		const database = require('../config/db.js');        
		const componente = require('../models/componente.js');
		const grupo = require('../models/grupo.js');
		const isupdate = require('../models/isupdate.js');
		const seguimento = require('../models/seguimento.js');
		const user = require('../models/user.js');
		await database.sync();       
	} catch (err) {
		console.error('Database connection error: ', err);
	}

}

module.exports = synchronization;