'use strict'

const CONFIG = require('../models/dbConfig');

const KNEX = require('knex');

// module.exports = KNEX({
// 	client: 'mysql',
// 	connection: {
// 		host     : 'paginaedutest.cv1shjojl5xw.us-east-2.rds.amazonaws.com',
// 		user     : 'masterUser',
// 		password : 'radamanthys999',
// 		database : 'paginaedu',
// 		port: 3306
// 	}
// });

module.exports = KNEX({
	client: 'mysql',
	connection: {
		host     : 'sql.cihumana.com.mx',
		user     : 'cihum2',
		password : 'Cihdae20',
		database : 'cihum2_web2019',
		port: '3306'
	}
});