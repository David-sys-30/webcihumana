'use strict'

let Servicio = require('../models/servicios.model');
const CONN = require('./connection');
let jwt = require('../services/jwt');


function crearServicio(req, res){
	let servicio = new Servicio(
		req.body.idCategoriaservicio_Servicio, 
		req.body.nombreServicio, 
		req.body.descripcionServicio,
		req.body.urlvideoServicio);
	CONN('servicio').select().where('nombreServicio',req.body.nombreServicio)
	.then(row=>{
		if (row.length > 0) {
			res.status(200).send({mensaje:'El servicio que quieres crear ya existe, intenta con otro'})
		}else{
			CONN('servicio').insert(servicio).then(idServicio=>{
				if (!idServicio) {
					res.status(500).send({resp:'Error', error: 'No se creó el Servicio'});
				}else{
					res.status(200).send({
						resp:'Servicios registrado',
						idServicio:idServicio
						// file:req.file
					});
				}
			}).catch(error =>{
				res.status(500).send({resp:'error',
					error: `${error}`});
			});
		}
		
	})
}


function actualizaServicio (req,res){
	let idServicio = req.params.idServicio;	
	let servicio = new Servicio(
		req.body.idCategoriaservicio_Servicio, 
		req.body.nombreServicio, 
		req.body.descripcionServicio,
		req.body.urlvideoServicio);
	CONN('servicio').where('idServicio', idServicio)
	.update(servicio).then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se actualizó correctamente'})
		}else{
			// res.status(200).send({resp:'Datos actualizados correctamente',administrador:result})
			CONN('servicio').select().where('idServicio',idServicio).then(servicio=>{
				if (!servicio) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',servicio:servicio,message:'Servicio actualizado correctamente'});
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

function veServicio(req,res){
	let idServicio = req.params.idServicio;
	CONN('servicio').select().where('idServicio', idServicio).then(rows=>{
		if (!rows) {
			res.status(404).send({resp:'Sin resultados',
				message:'No se encontraron servicios'});
		}else{
			res.status(200).send({
				resp:'Servicios',
				Servicio:rows
			})
		}
	}).catch(error=>{
		res.status(500).send({resp:'Error',error:`${error}`});
	})
}

function getServicios(req,res){
	CONN('servicio').select('*').then(rows=>{
		if (!rows) {
			res.status(404).send({resp:'Sin resultados',
				message:'No se encontraron servicios'});
		}else{
			res.status(200).send({
				resp:'Servicios',
				Servicio:rows
			})
		}
	}).catch(error=>{
		res.status(500).send({resp:'Error',error:`${error}`});
	})
}

function deleteServicio(req,res){
	let idServicio = req.params.idServicio;
	CONN('servicio').where('idServicio', idServicio)
	.del().then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se eliminó correctamente'})
		}else{
			// res.status(200).send({resp:'Datos actualizados correctamente',administrador:result})
			CONN('servicio').select().where('idServicio',idServicio).then(servicio=>{
				if (!servicio) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',servicio:servicio,message:'Servicio eliminado correctamente'});
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

function dabajaServicio (req, res){
	let idServicio = req.params.idServicio;
	CONN('servicio').where('idServicio', idServicio).update('statusServicio', 0).then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se actualizo correctamente'})
		}else{
			CONN('servicio').select().where('idServicio',idServicio).then(client=>{
				if (!client) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',cliente:client,message:'Servicio dado de baja'});
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

function daaltaServicio (req, res){
	let idServicio = req.params.idServicio;
	CONN('servicio').where('idServicio', idServicio).update('statusServicio', 1).then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se actualizo correctamente'})
		}else{
			CONN('servicio').select().where('idServicio',idServicio).then(client=>{
				if (!client) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',cliente:client,message:'Servicio dado de baja'});
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
	crearServicio,
	actualizaServicio,
	deleteServicio,
	veServicio,
	getServicios,
	daaltaServicio,
	dabajaServicio
}