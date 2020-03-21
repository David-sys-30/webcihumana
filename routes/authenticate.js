var express = require('express');
var router = express.Router();
var jnt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var knex = require('knex')({
	client: 'mysql',
	connection: {
		host     : 'localhost',
		user     : 'root',
		password : 'root',
		database : 'testing'
	}
});
router.use(bodyParser.urlencoded({
	extended: true
}));
router.use(bodyParser.json());

router.post('/authenticate', function(req, res){
	knex('users').where({
		  email: req.params.email
		}).select('*').then(function(ret){ 
			if (ret.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
      	const payload = {
      	admin: ret.admin 
    	};
      		var token = jwt.sign(payload, app.get('superSecret'), {
        	expiresInMinutes: 1440 // expires in 24 hours
        	});
	        	res.json({
		          success: true,
		          message: 'Enjoy your token!',
		          token: token
	        	});
      }
  			
	}, function(err){
			res.json({ success: false, message: 'Authentication failed. User not found.'});
	});  			
});
module.exports = router;