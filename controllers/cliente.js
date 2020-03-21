'use strict'

let Cliente = require('../models/model_cliente');
let ClienteServicio = require('../models/model_clienteservicio');
const CONN = require('./connection');
let jwt = require('../services/jwt');
let path = require('path');
var fs = require('fs');


function getCliente(req,res){
	CONN('cliente').select('*').then(rows=>{
		if (!rows) {
			res.status(404).send({resp:'Sin resultados',
				message:'No se encontraron clientes'});
		}else{
			res.status(200).send({
				resp:'Clientes',
				client:rows
			})
		}
	}).catch(error=>{
		res.status(500).send({resp:'Error',error:`${error}`});
	})
}


function getCliente1(req,res){
	let idCliente = req.params.idCliente;
	CONN('cliente').select('*').where('idCliente',idCliente).then(rows=>{
		if (!rows) {
			res.status(404).send({resp:'Sin resultados',
				message:'No se encontraron clientes'});
		}else{
			res.status(200).send({
				resp:'Clientes',
				client:rows
			})
		}
	}).catch(error=>{
		res.status(500).send({resp:'Error',error:`${error}`});
	})
}


function getserviciosliente(req,res){
	CONN('clienteservico').select('*').then(rows=>{
		if (!rows) {
			res.status(404).send({resp:'Sin resultados',
				message:'No se encontraron servicios de clientes'});
		}else{
			res.status(200).send({
				resp:'Servicios Cliente',
				servclient:rows
			})
		}
	}).catch(error=>{
		res.status(500).send({resp:'Error',error:`${error}`});
	})
}

function deactivateCliente(req,res){
	let idCliente = req.params.idCliente;
	CONN('cliente').where('idCliente',idCliente).update('statusCliente', 0)
	.then(result=>{
		if (!result) {
			res.status(500).send({resp:'Error',message:'No se actualizó el Status'})
		}else{
			CONN('cliente').select('statusCliente').where('idCliente',idCliente)
			.then(statusCliente=>{
				if (!statusCliente) {
					res.status(500).send({resp:'Error',message:'error al devolver Status'})
				}
				else{
					res.status(200).send({statusCliente:statusCliente[0]});
				}
			}).catch(error=>{
				res.status(404).send({resp:'Error',error:`${error}`});
			})
		}
	}).catch(error=>{
		res.status(404).send({resp:'Error',error:`${error}`});
	})
}

function activateCliente(req,res){
	let idCliente = req.params.idCliente;
	CONN('cliente').where('idCliente',idCliente).update('statusCliente', 1)
	.then(result=>{
		if (!result) {
			res.status(500).send({resp:'Error',message:'No se actualizó el Status'})
		}else{
			CONN('cliente').select('statusCliente').where('idCliente',idCliente)
			.then(statusCliente=>{
				if (!statusCliente) {
					res.status(500).send({resp:'Error',message:'error al devolver Status'})
				}
				else{
					res.status(200).send({statusCliente:statusCliente[0]});
				}
			}).catch(error=>{
				res.status(404).send({resp:'Error',error:`${error}`});
			})
		}
	}).catch(error=>{
		res.status(404).send({resp:'Error',error:`${error}`});
	})
}




function creaCliente(req, res){
	let stat = 1;
	let cliente = new Cliente(req.body.empresaCliente,
		stat,
		req.body.fotoCliente);
			CONN('cliente').insert(cliente).then(idCliente=>{
				if (!idCliente) {
					res.status(500).send({resp:'Error', error: 'No se insertó el Cliente'});
				}else{
					res.status(200).send({
						resp:'Cliente registrado',
						idCliente:idCliente
						// file:req.file
					});
				}
			}).catch(error =>{
				res.status(500).send({resp:'error',
					error: `${error}`});
			});
		}


function eliminaCliente (req,res){
	let idCliente = req.params.idCliente;
	CONN('cliente').where('idCliente', idCliente).delete().then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se eliminó correctamente'})
		}else{
			CONN('cliente').select().where('idCliente',idCliente).then(client=>{
				if (!client) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',cliente:idCliente,message:'Cliente eliminado correctamente'});
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


function actualizaCliente (req,res){
	let idCliente = req.params.idCliente;	
	let cliente = new Cliente(req.body.empresaCliente,
		req.body.statusCliente,
		req.body.fotoCliente);
	CONN('cliente').where('idCliente', idCliente).update(cliente).then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se actualizo correctamente'})
		}else{
			// res.status(200).send({resp:'Datos actualizados correctamente',administrador:result})
			CONN('cliente').select().where('idCliente',idCliente).then(client=>{
				if (!client) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',cliente:client,message:'Cliente actualizado correctamente'});
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
	let idCliente = req.params.idCliente;
	let fotoCliente = req.file;
	CONN('cliente').where('idCliente',idCliente).update('fotoCliente', req.file.filename).then(result=>{
		if (!result) {
			res.result(500).send({resp:'Error', message:'No se actualizó la foto'})
		}else{
			CONN('cliente').select().where('idCliente',idCliente).then(image=>{
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

var getImageFile = (req, res)=>{
	var imagenFile = req.params.fotoCliente;
	var path_file = `./imgs/Cliente/${imagenFile}`;
	fs.exists(path_file,(exists)=>{
		if (exists) {
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message:'No existe la imagen'});
		}
	});
}

var getImageFileServicio = (req, res)=>{
	var imagenFile = req.params.fotoServicio_ClienteServicio;
	var path_file = `./imgs/ServicioCliente/${imagenFile}`;
	fs.exists(path_file,(exists)=>{
		if (exists) {
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message:'No existe la imagen'});
		}
	});
}

module.exports = {
	creaCliente,
	getCliente,
	eliminaCliente,
	actualizaCliente,
	getImageFile,
	subeImagen,
	activateCliente,
	deactivateCliente,
	getCliente1,
	getserviciosliente,
	getImageFileServicio
}