'use strict'

class Servicio{
	constructor(idCategoriaservicio_Servicio, nombreServicio, descripcionServicio, urlvideoServicio, statusServicio){
		this.idCategoriaservicio_Servicio = idCategoriaservicio_Servicio;
		this.nombreServicio = nombreServicio;
		this.descripcionServicio = descripcionServicio;
		this.urlvideoServicio = urlvideoServicio;
		this.statusServicio = statusServicio;
	}
}

module.exports = Servicio;