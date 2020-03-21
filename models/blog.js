'use strict'

class noticiaBlog{
	constructor(idCategoriablog_Noticiablog, imagenNoticiablog, tituloNoticiablog, descripcionNoticiablog,fechaNoticiablog,statusNoticiablog){
		this.idCategoriablog_Noticiablog = idCategoriablog_Noticiablog;
		this.imagenNoticiablog = imagenNoticiablog;
		this.tituloNoticiablog = tituloNoticiablog;
		this.descripcionNoticiablog = descripcionNoticiablog;
		this.fechaNoticiablog = fechaNoticiablog;	
		this.statusNoticiablog = statusNoticiablog
	}
}

module.exports = noticiaBlog;