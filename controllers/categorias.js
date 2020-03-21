'use strict'

let CatBlo = require('../models/model_categoriasblo');
let CatSer = require('../models/model_categoriasser');
const CONN = require('./connection');
let jwt = require('../services/jwt');
let path = require('path');
var fs = require('fs');


function getCategoriaSer(req,res){
	CONN('categoriaservicio').select('*').then(rows=>{
		if (!rows) {
			res.status(404).send({resp:'Sin resultados',
				message:'No se encontraron categorias de servicio'});
		}else{
			res.status(200).send({
				resp:'Categoria Servicio',
				CatServ:rows
			})
		}
	}).catch(error=>{
		res.status(500).send({resp:'Error',error:`${error}`});
	})
}

function getCategoriaSer1(req,res){
	let idCategoriaservicio_Servicio = req.params.idCategoriaservicio_Servicio;
	CONN('categoriaservicio').select('*').where('idCategoriaservicio_Servicio',idCategoriaservicio_Servicio).then(rows=>{
		if (!rows) {
			res.status(404).send({resp:'Sin resultados',
				message:'No se encontraron categorias de servicio'});
		}else{
			res.status(200).send({
				resp:'Categoria Servicio',
				CatServ:rows
			})
		}
	}).catch(error=>{
		res.status(500).send({resp:'Error',error:`${error}`});
	})
}

function getCategoriaBlo(req,res){
	CONN('categoriablog').select('*').then(rows=>{
		if (!rows) {
			res.status(404).send({resp:'Sin resultados',
				message:'No se encontraron categorias de blog'});
		}else{
			res.status(200).send({
				resp:'Categoria Blog',
				CatBlog:rows
			})
		}
	}).catch(error=>{
		res.status(500).send({resp:'Error',error:`${error}`});
	})
}
function getCategoriaBlo1(req,res){
	let idCategoriablog = req.params.idCategoriablog;
	CONN('categoriablog').select('*').where('idCategoriablog',idCategoriablog).then(rows=>{
		if (!rows) {
			res.status(404).send({resp:'Sin resultados',
				message:'No se encontraron categorias de blog'});
		}else{
			res.status(200).send({
				resp:'Categoria Blog',
				CatBlog:rows
			})
		}
	}).catch(error=>{
		res.status(500).send({resp:'Error',error:`${error}`});
	})
}

function creaCategoriaSer(req, res){
	let catser = new CatSer(req.body.nombreCategoriaservicio);
			CONN('categoriaservicio').insert(catser).then(idCategoriaservicio_Servicio=>{
				if (!idCategoriaservicio_Servicio) {
					res.status(500).send({resp:'Error', error: 'No se insertó la categoria'});
				}else{
					res.status(200).send({
						resp:'Categoria de servicio registrada',
						idCategoriaservicio_Servicio:idCategoriaservicio_Servicio
						// file:req.file
					});
				}
			}).catch(error =>{
				res.status(500).send({resp:'error',
					error: `${error}`});
			});
		}

function creaCategoriaBlo(req, res){
	let catblo = new CatBlo(
		req.body.nombreCategoriablog);
			CONN('categoriablog').insert(catblo).then(idCategoriablog=>{
				if (!idCategoriablog) {
					res.status(500).send({resp:'Error', error: 'No se insertó la categoria'});
				}else{
					res.status(200).send({
						resp:'Categoria de blog registrada',
						idCategoriablog:idCategoriablog
						// file:req.file
					});
				}
			}).catch(error =>{
				res.status(500).send({resp:'error',
					error: `${error}`});
			});
		}


function eliminaCategoriaSer (req,res){
	let idCategoriaservicio = req.params.idCategoriaservicio;
	CONN('categoriaservicio').where('idCategoriaservicio', idCategoriaservicio).delete().then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se eliminó correctamente'})
		}else{
			CONN('categoriaservicio').select().where('idCategoriaservicio',idCategoriaservicio).then(client=>{
				if (!client) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',catser:idCategoriaservicio,message:'Categoria de servicio eliminada correctamente'});
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


function eliminaCategoriaBlo (req,res){
	let idCategoriablog = req.params.idCategoriablog;
	CONN('categoriablog').where('idCategoriablog', idCategoriablog).delete().then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se eliminó correctamente'})
		}else{
			CONN('categoriablog').select().where('idCategoriablog',idCategoriablog).then(client=>{
				if (!client) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',catblo:idCategoriablog,message:'Categoria de blog eliminada correctamente'});
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

function actualizaCategoriaSer (req,res){
	let idCategoriaservicio_Servicio = req.params.idCategoriaservicio_Servicio;	
	let catser = new CatSer(
		req.body.nombreCategoriaservicio);
	CONN('categoriaservicio').where('idCategoriaservicio_Servicio', idCategoriaservicio_Servicio).update(catser).then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se actualizo correctamente'})
		}else{
			CONN('categoriaservicio').select().where('idCategoriaservicio_Servicio',idCategoriaservicio_Servicio).then(client=>{
				if (!client) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',cliente:client,message:'Categoria de servicio actualizada correctamente'});
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

function actualizaCategoriaBlo (req,res){
	let idCategoriablog = req.params.idCategoriablog;	
	let catblo = new CatBlo(
		req.body.nombreCategoriablog);
	CONN('categoriablog').where('idCategoriablog', idCategoriablog).update(catblo).then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se actualizo correctamente'})
		}else{
			CONN('categoriablog').select().where('idCategoriablog',idCategoriablog).then(client=>{
				if (!client) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',cliente:client,message:'Categoria de blog actualizada correctamente'});
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

function deactivatecategoriaBlog(req,res){
	let idCategoriablog = req.params.idCategoriablog;
	CONN('categoriablog').where('idCategoriablog',idCategoriablog).update('statusCategoriablog', 0)
	.then(result=>{
		if (!result) {
			res.status(500).send({resp:'Error',message:'No se actualizó el Status'})
		}else{
			CONN('categoriablog').select('statusCategoriablog').where('idCategoriablog',idCategoriablog)
			.then(statusCategoriablog=>{
				if (!statusCategoriablog) {
					res.status(500).send({resp:'Error',message:'error al devolver Status'})
				}
				else{
					res.status(200).send({statusCategoriablog:statusCategoriablog[0]});
				}
			}).catch(error=>{
				res.status(404).send({resp:'Error',error:`${error}`});
			})
		}
	}).catch(error=>{
		res.status(404).send({resp:'Error',error:`${error}`});
	})
}

function activatecategoriaBlog(req,res){
	let idCategoriablog = req.params.idCategoriablog;
	CONN('categoriablog').where('idCategoriablog',idCategoriablog).update('statusCategoriablog', 1)
	.then(result=>{
		if (!result) {
			res.status(500).send({resp:'Error',message:'No se actualizó el Status'})
		}else{
			CONN('categoriablog').select('statusCategoriablog').where('idCategoriablog',idCategoriablog)
			.then(statusCategoriablog=>{
				if (!statusCategoriablog) {
					res.status(500).send({resp:'Error',message:'error al devolver Status'})
				}
				else{
					res.status(200).send({statusCategoriablog:statusCategoriablog[0]});
				}
			}).catch(error=>{
				res.status(404).send({resp:'Error',error:`${error}`});
			})
		}
	}).catch(error=>{
		res.status(404).send({resp:'Error',error:`${error}`});
	})
}

function deactivatecategoriaSer(req,res){
	let idCategoriaservicio_Servicio = req.params.idCategoriaservicio_Servicio;
	CONN('categoriaservicio').where('idCategoriaservicio_Servicio',idCategoriaservicio_Servicio).update('statusCategoriaservicio', 0)
	.then(result=>{
		if (!result) {
			res.status(500).send({resp:'Error',message:'No se actualizó el Status'})
		}else{
			CONN('categoriaservicio').select('statusCategoriaservicio').where('idCategoriaservicio_Servicio',idCategoriaservicio_Servicio)
			.then(statusCategoriaservicio=>{
				if (!statusCategoriaservicio) {
					res.status(500).send({resp:'Error',message:'error al devolver Status'})
				}
				else{
					res.status(200).send({statusCategoriaservicio:statusCategoriaservicio[0]});
				}
			}).catch(error=>{
				res.status(404).send({resp:'Error',error:`${error}`});
			})
		}
	}).catch(error=>{
		res.status(404).send({resp:'Error',error:`${error}`});
	})
}

function activatecategoriaSer(req,res){
	let idCategoriaservicio_Servicio = req.params.idCategoriaservicio_Servicio;
	CONN('categoriaservicio').where('idCategoriaservicio_Servicio',idCategoriaservicio_Servicio).update('statusCategoriaservicio', 1)
	.then(result=>{
		if (!result) {
			res.status(500).send({resp:'Error',message:'No se actualizó el Status'})
		}else{
			CONN('categoriaservicio').select('statusCategoriaservicio').where('idCategoriaservicio_Servicio',idCategoriaservicio_Servicio)
			.then(statusCategoriaservicio=>{
				if (!statusCategoriaservicio) {
					res.status(500).send({resp:'Error',message:'error al devolver Status'})
				}
				else{
					res.status(200).send({statusCategoriaservicio:statusCategoriaservicio[0]});
				}
			}).catch(error=>{
				res.status(404).send({resp:'Error',error:`${error}`});
			})
		}
	}).catch(error=>{
		res.status(404).send({resp:'Error',error:`${error}`});
	})
}

module.exports = {
	creaCategoriaBlo,
	creaCategoriaSer,
	getCategoriaBlo,
	getCategoriaSer,
	getCategoriaBlo1,
	eliminaCategoriaBlo,
	eliminaCategoriaSer,
	actualizaCategoriaBlo,
	actualizaCategoriaSer,
	deactivatecategoriaBlog,
	activatecategoriaBlog,
	deactivatecategoriaSer,
	activatecategoriaSer,
	getCategoriaSer1
}