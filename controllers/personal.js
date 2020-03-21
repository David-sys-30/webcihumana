'use strict'

let Personal = require('../models/model_personal');
const CONN = require('./connection');
let path = require('path');
var fs = require('fs');


function getPersonal(req,res){
	CONN('personal').select('*').then(rows=>{
		if (!rows) {
			res.status(404).send({resp:'Sin resultados',
				message:'No se encontro personal'});
		}else{
			res.status(200).send({
				resp:'Personal',
				personal:rows
			})
		}
	}).catch(error=>{
		res.status(500).send({resp:'Error',error:`${error}`});
	})
}

function vePersonal(req, res){
	let idPersonal = req.params.idPersonal;
	CONN('personal').select().where('idPersonal',idPersonal).then(rows=>{
		if (!rows) {
			res.status(404).send({resp:'Sin resultados',
				message:'No se encontro personal'});
		}else{
			res.status(200).send({
				resp:'Personal',
				personal:rows
			})
		}
	}).catch(error=>{
		res.status(500).send({resp:'Error',error:`${error}`});
	})
}

function creaPersonal(req, res){
	let fotoPersonal = 'default.png';
	let statusPersonal = 1;
	let personal = new Personal(req.body.nombrePersonal,
		req.body.apellidopaternoPersonal,
		req.body.apellidomaternoPersonal,
		req.body.telefonoPersonal,
		req.body.puestoPersonal, 
		statusPersonal,
		req.body.frasePersonal,
		fotoPersonal);
			CONN('personal').insert(personal).then(idPersonal=>{
				if (!idPersonal) {
					res.status(500).send({resp:'Error', error: 'No se insertó el Personal'});
				}else{
					res.status(200).send({
						resp:'Personal registrado',
						idPersonal:idPersonal
						// file:req.file
					});
				}
			}).catch(error =>{
				res.status(500).send({resp:'error',
					error: `${error}`});
			});
		}


function eliminaPersonal (req,res){
	let idPersonal = req.params.idPersonal;
	CONN('personal').where('idPersonal', idPersonal).delete().then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se elimino correctamente'})
		}else{
			CONN('personal').select().where('idPersonal',idPersonal).then(personal=>{
				if (!personal) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',personal:idPersonal,message:'Personal eliminado correctamente'});
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


function actualizaPersonal (req,res){
	let idPersonal = req.params.idPersonal;	
	let personal = new Personal(req.body.nombrePersonal,
		req.body.apellidopaternoPersonal,
		req.body.apellidomaternoPersonal,
		req.body.telefonoPersonal,
		req.body.puestoPersonal,
		req.body.statusPersonal, 
		req.body.frasePersonal,
		req.body.fotoPersonal);
	CONN('personal').where('idPersonal', idPersonal).update(personal).then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se actualizo correctamente'})
		}else{
			// res.status(200).send({resp:'Datos actualizados correctamente',administrador:result})
			CONN('personal').select().where('idPersonal',idPersonal).then(pers=>{
				if (!personal) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',personal:pers,message:'Personal actualizado correctamente'});
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


function subeImagenPersonal(req,res){
	let idPersonal = req.params.idPersonal;
	let fotoPersonal = req.file;
	CONN('personal').where('idPersonal',idPersonal).update('fotoPersonal', req.file.filename).then(result=>{
		if (!result) {
			res.result(500).send({resp:'Error', message:'No se actualizó la foto'})
		}else{
			CONN('personal').select().where('idPersonal',idPersonal).then(image=>{
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

var getImageFilePersonal = (req, res)=>{
	var imagenFile = req.params.fotoPersonal;
	var path_file = `./imgs/Personal/${imagenFile}`;
	fs.exists(path_file,(exists)=>{
		if (exists) {
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message:'No existe la imagen'});
		}
	});
}

function dabajaPersonal (req, res){
	let idPersonal = req.params.idPersonal;
	CONN('personal').where('idPersonal', idPersonal).update('statusPersonal', 0).then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se actualizo correctamente'})
		}else{
			CONN('personal').select().where('idPersonal',idPersonal).then(client=>{
				if (!client) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',cliente:client,message:'Personal dado de baja'});
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

function daaltaPersonal (req, res){
	let idPersonal = req.params.idPersonal;
	CONN('personal').where('idPersonal', idPersonal).update('statusPersonal', 1).then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se actualizo correctamente'})
		}else{
			CONN('personal').select().where('idPersonal',idPersonal).then(client=>{
				if (!client) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',cliente:client,message:'Personal dado de baja'});
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
	creaPersonal,
	getPersonal,
	eliminaPersonal,
	actualizaPersonal,
	getImageFilePersonal,
	subeImagenPersonal,
	vePersonal,
	daaltaPersonal,
	dabajaPersonal
}