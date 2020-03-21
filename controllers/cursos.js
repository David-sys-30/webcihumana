'use strict'

let Curso = require('../models/model_cursos');
const CONN = require('./connection');
let jwt = require('../services/jwt');
let path = require('path');
var fs = require('fs');


function getCurso(req,res){
	CONN('curso').select('*').then(rows=>{
		if (!rows) {
			res.status(404).send({resp:'Sin resultados',
				message:'No se encontraron cursos'});
		}else{
			res.status(200).send({
				resp:'Cursos',
				curso:rows
			})
		}
	}).catch(error=>{
		res.status(500).send({resp:'Error',error:`${error}`});
	})
}

function veCurso(req, res){
	let idCurso = req.params.idCurso;
	CONN('curso').select().where('idCurso',idCurso).then(rows=>{
		if (!rows) {
			res.status(404).send({resp:'Sin resultados',
				message:'No se encontraron cursos'});
		}else{
			res.status(200).send({
				resp:'Cursos',
				curso:rows
			})
		}
	}).catch(error=>{
		res.status(500).send({resp:'Error',error:`${error}`});
	})
}

function creaCurso(req, res){
	let curso = new Curso(req.body.nombreCurso, 
		req.body.descripcionCurso, 
		req.body.aprendizajeCurso,
		req.body.objetivoCurso,
		req.body.duracionCurso,
		req.body.urlCurso);
			CONN('curso').insert(curso).then(idCurso=>{
				if (!idCurso) {
					res.status(500).send({resp:'Error', error: 'No se insertó el Curso'});
				}else{
					res.status(200).send({
						resp:'Curso registrado',
						idCurso:idCurso
					});
				}
			}).catch(error =>{
				res.status(500).send({resp:'error',
					error: `${error}`});
			});
		}

function subeImagen(req,res){
	let idCurso = req.params.idCurso;
	let foto = req.file;
	CONN('curso').where('idCurso',idCurso).update('imagenCurso',req.file.filename)
	.then(result=>{
		if (!result) {
			res.status(500).send({resp:'Error',message:'No se actualizo la foto'})
		}else{
			CONN('curso').select('imagenCurso').where('idCurso',idCurso)
			.then(image=>{
				if (!image) {
					res.status(500).send({resp:'Error',message:'error al devolver foto'})
				}
				else{
					res.status(200).send({image:image[0]});
				}
			}).catch(error=>{
				res.status(404).send({resp:'Error',error:`${error}`});
			})
		}
	}).catch(error=>{
		res.status(404).send({resp:'Error',error:`${error}`});
	})
}

var getImageFileCurso = (req, res)=>{
	var imagenFile = req.params.imagenCurso;
	var path_file = `./imgs/curso/${imagenFile}`;
	fs.exists(path_file,(exists)=>{
		if (exists) {
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message:'No existe la imagen'});
		}
	});
}

function eliminaCurso (req,res){
	let idCurso = req.params.idCurso;
	CONN('curso').where('idCurso', idCurso).delete().then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se eliminó correctamente'})
		}else{
			CONN('curso').select().where('idCurso',idCurso).then(client=>{
				if (!client) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',curso:idCurso,message:'Curso eliminado correctamente'});
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


function actualizaCurso (req,res){
	let idCurso = req.params.idCurso;	
	let curso = new Curso(req.body.nombreCurso, 
		req.body.descripcionCurso, 
		req.body.aprendizajeCurso,
		req.body.objetivoCurso,
		req.body.duracionCurso,
		req.body.urlCurso);
	CONN('curso').where('idCurso', idCurso).update(curso).then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se actualizo correctamente'})
		}else{
			CONN('curso').select().where('idCurso',idCurso).then(client=>{
				if (!client) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',cliente:client,message:'Curso actualizado correctamente'});
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

function dabajaCurso (req, res){
	let idCurso = req.params.idCurso;
	CONN('curso').where('idCurso', idCurso).update('statusCurso', 0).then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se actualizo correctamente'})
		}else{
			CONN('curso').select().where('idCurso',idCurso).then(client=>{
				if (!client) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',cliente:client,message:'Curso dado de baja'});
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

function daaltaCurso (req, res){
	let idCurso = req.params.idCurso;
	CONN('curso').where('idCurso', idCurso).update('statusCurso', 1).then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se actualizo correctamente'})
		}else{
			CONN('curso').select().where('idCurso',idCurso).then(client=>{
				if (!client) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',cliente:client,message:'Curso dado de baja'});
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
	veCurso,
	creaCurso,
	getCurso,
	eliminaCurso,
	actualizaCurso,
	dabajaCurso,
	daaltaCurso,
	subeImagen,
	getImageFileCurso
}