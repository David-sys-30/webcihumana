'use strict'

let noticiaBlog = require('../models/blog');
const CONN = require('./connection');
let jwt = require('../services/jwt');
let path = require('path');
var fs = require('fs');


function getnoticiaBlog(req,res){
	CONN('noticiablog').select('*').orderBy('fechaNoticiablog', 'desc').then(rows=>{
		if (!rows) {
			res.status(404).send({resp:'Sin resultados',
				message:'No se encontraron noticias'});
		}else{
			res.status(200).send({
				resp:'Noticias',
				Noticias:rows
			})
		}
	}).catch(error=>{
		res.status(500).send({resp:'Error',error:`${error}`});
	})
}

function getnoticiaBlog2(req,res){
	let idNoticiablog = req.params.idNoticiablog;
	CONN('noticiablog').select('*').where('idNoticiablog',idNoticiablog).orderBy('fechaNoticiablog', 'desc').then(rows=>{
		if (!rows) {
			res.status(404).send({resp:'Sin resultados',
				message:'No se encontraron noticias'});
		}else{
			res.status(200).send({
				resp:'Noticias',
				Noticias:rows
			})
		}
	}).catch(error=>{
		res.status(500).send({resp:'Error',error:`${error}`});
	})
}


function getnoticiaBlog1(req,res){
	let idCategoriablog_Noticiablog = req.params.idCategoriablog_Noticiablog;
	CONN('noticiablog').select('*').where('idCategoriablog_Noticiablog',idCategoriablog_Noticiablog).orderBy('fechaNoticiablog', 'desc').then(rows=>{
		if (!rows) {
			res.status(404).send({resp:'Sin resultados',
				message:'No se encontraron noticias'});
		}else{
			res.status(200).send({
				resp:'Noticias',
				Noticias:rows
			})
		}
	}).catch(error=>{
		res.status(500).send({resp:'Error',error:`${error}`});
	})
}

function creanoticiaBlog(req, res){
	let noticiablog = new noticiaBlog(
		req.body.idCategoriablog_Noticiablog, 
		req.body.imagenNoticiablog, 
		req.body.tituloNoticiablog,
		req.body.descripcionNoticiablog, 
		req.body.fechaNoticiablog, 
		req.body.statusNoticiablog);
			CONN('noticiablog').insert(noticiablog).then(idNoticiablog=>{
				if (!idNoticiablog) {
					res.status(500).send({resp:'Error', error: 'No se insertó la noticia'});
				}else{
					res.status(200).send({
						resp:'Noticia registrada',
						idNoticiablog:idNoticiablog
						// file:req.file
					});
				}
			}).catch(error =>{
				res.status(500).send({resp:'error',
					error: `${error}`});
			});
		}


function eliminanoticiaBlog (req,res){
	let idNoticiablog = req.params.idNoticiablog;
	CONN('noticiablog').where('idNoticiablog', idNoticiablog).delete().then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se eliminó correctamente'})
		}else{
			CONN('noticiablog').select().where('idNoticiablog',idNoticiablog).then(noticia=>{
				if (!noticia) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',noticia:idNoticiablog,message:'Noticia eliminada correctamente'});
				}
			}).catch(error=>{
				res.status(404).send({resp:'Error2',error:`${error}`});
			})
		}
	}).catch(error=>{
		res.status(404).send({resp:'Error1',error:`${error}`});
		console.log(`${error}`);
	})
}


function actualizanoticiaBlog (req,res){
	let idNoticiablog = req.params.idNoticiablog;	
	let noticiablog = new noticiaBlog(
		req.body.idCategoriablog_Noticiablog, 
		req.body.imagenNoticiablog, 
		req.body.tituloNoticiablog,
		req.body.descripcionNoticiablog, 
		req.body.fechaNoticiablog, 
		req.body.statusNoticiablog);
	CONN('noticiablog').where('idNoticiablog', idNoticiablog).update(noticiablog).then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se actualizo correctamente'})
		}else{
			// res.status(200).send({resp:'Datos actualizados correctamente',administrador:result})
			CONN('noticiablog').select().where('idNoticiablog',idNoticiablog).then(noticia=>{
				if (!noticia) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',noticia:noticia,message:'Noticia actualizada correctamente'});
				}
			}).catch(error=>{
				res.status(404).send({resp:'Error2',error:`${error}`});
			})
		}
	}).catch(error=>{
		res.status(404).send({resp:'Error1',error:`${error}`});
		console.log(`${error}`);
	})
}


function subeImagen(req,res){
	let idNoticiablog = req.params.idNoticiablog;
	let imagenNoticiablog = req.file;
	CONN('noticiablog').where('idNoticiablog',idNoticiablog).update('imagenNoticiablog', req.file.filename).then(result=>{
		if (!result) {
			res.result(500).send({resp:'Error', message:'No se actualizó la foto'})
		}else{
			CONN('noticiablog').select().where('idNoticiablog',idNoticiablog).then(image=>{
				if (!image) {
					res.status(500).send({resp:'Error',message:'Error al devolver foto'})
				}else{
					res.status(200).send({image:image[0]});
				}
			}).catch(error=>{
				res.status(404).send({resp:'Error2',error:`${error}`});
			})
		}
	}).catch(error=>{
		res.status(404).send({resp:'Error1',error:`${error}`});
	})
}

var getImageFileBlog = (req, res)=>{
	var imagenFile = req.params.imagenNoticiablog;
	var path_file = `./imgs/blog/${imagenFile}`;
	fs.exists(path_file,(exists)=>{
		if (exists) {
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message:'No existe la imagen'});
		}
	});
}

function dabajaBlog (req, res){
	let idNoticiablog = req.params.idNoticiablog;
	CONN('noticiablog').where('idNoticiablog', idNoticiablog).update('statusNoticiablog', 0).then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se actualizo correctamente'})
		}else{
			CONN('noticiablog').select().where('idNoticiablog',idNoticiablog).then(client=>{
				if (!client) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',cliente:client,message:'Noticia dada de baja'});
				}
			}).catch(error=>{
				res.status(404).send({resp:'Error2',error:`${error}`});
			})
		}
	}).catch(error=>{
		res.status(404).send({resp:'Error1',error:`${error}`});
		console.log(`${error}`);
	})
}

function daaltaBlog (req, res){
	let idNoticiablog = req.params.idNoticiablog;
	CONN('noticiablog').where('idNoticiablog', idNoticiablog).update('statusNoticiablog', 1).then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se actualizo correctamente'})
		}else{
			CONN('noticiablog').select().where('idNoticiablog',idNoticiablog).then(client=>{
				if (!client) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',cliente:client,message:'Noticia dada de baja'});
				}
			}).catch(error=>{
				res.status(404).send({resp:'Error2',error:`${error}`});
			})
		}
	}).catch(error=>{
		res.status(404).send({resp:'Error1',error:`${error}`});
		console.log(`${error}`);
	})
}

module.exports = {
	creanoticiaBlog,
	getnoticiaBlog,
	eliminanoticiaBlog,
	getnoticiaBlog1,
	getnoticiaBlog2,
	actualizanoticiaBlog,
	 getImageFileBlog,
	subeImagen,
	daaltaBlog,
	dabajaBlog
}