'use strict'

class Personal{
	constructor(nombrePersonal, apellidopaternoPersonal, apellidomaternoPersonal, telefonoPersonal, puestoPersonal, statusPersonal, frasePersonal, fotoPersonal){
		this.nombrePersonal = nombrePersonal;
		this.apellidopaternoPersonal = apellidopaternoPersonal;
		this.apellidomaternoPersonal = apellidomaternoPersonal;
		this.telefonoPersonal = telefonoPersonal;
		this.puestoPersonal = puestoPersonal;
		this.statusPersonal = statusPersonal;
		this.frasePersonal = frasePersonal;
		this.fotoPersonal = fotoPersonal;
	}
}

module.exports = Personal;