'use strict'

let jwt = require('jwt-simple');
let moment = require('moment');
let secret = 'clave_secreta';

exports.createToken = function(admin){
	let payload = {
		// Sub es para guardar el id
		sub:admin.id_administrador,
		nombre:admin.nombre,
		ap_paterno:admin.ap_paterno,
		ap_materno:admin.ap_materno,
		correo:admin.correo,
		password:admin.contraseña,
		foto:admin.foto,
		

		// Fecha de creacion del Token
		iat:moment().unix(),

		// Expiracion de dicho token
		exp:moment().add(30, 'days').unix
	};
	return jwt.encode(payload, secret);
}