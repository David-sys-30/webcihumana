'use strict'

class ClienteServicio{
	constructor(idCliente_ClienteServcio,idServicio_ClienteServicio, descripcionServicio_ClienteServicio){
		this.idCliente_ClienteServcio = idCliente_ClienteServcio;
		this.idServicio_ClienteServicio = idServicio_ClienteServicio;
		this.descripcionServicio_ClienteServicio = descripcionServicio_ClienteServicio;
	}
}

module.exports = ClienteServicio;