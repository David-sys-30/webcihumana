'use strict'

let puntoServicio = require('../models/puntoServicio');
const CONN = require('./connection');
let jwt = require('../services/jwt');


function crearpuntoServicio(req, res){
	let Puntoservicio = new puntoServicio(
		req.body.descripcionPuntoservicio, 
		req.body.idServicio_Puntoservicio);
	CONN('puntoservicio').insert(Puntoservicio).then(idpuntoServicio=>{
				if (!idpuntoServicio) {
					res.status(500).send({resp:'Error', error: 'No se creó el Punto de Servicio'});
				}else{
					res.status(200).send({
						resp:'Punto de servicio registrado',
						idpuntoServicio:idpuntoServicio
						// file:req.file
					});
				}
			}).catch(error =>{
				res.status(500).send({resp:'error',
					error: `${error}`});
			});
		
}


function actualizapuntoServicio (req,res){
	let idPuntoservicio = req.params.idPuntoservicio;	
	let puntoservicio = new puntoServicio(
		req.body.descripcionPuntoservicio, 
		req.body.idServicio_Puntoservicio);
	CONN('puntoservicio').where('idPuntoservicio', idPuntoservicio)
	.update(puntoservicio).then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se actualizó correctamente'})
		}else{
			// res.status(200).send({resp:'Datos actualizados correctamente',administrador:result})
			CONN('puntoservicio').select().where('idPuntoservicio',idPuntoservicio).then(puntoservicio=>{
				if (!puntoservicio) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',puntoservicio:puntoservicio,message:'Punto de Servicio actualizado correctamente'});
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

function vepuntoServicios(req,res){
	let idPuntoservicio = req.params.idPuntoservicio;
	CONN('puntoservicio').select().where('idPuntoservicio', idPuntoservicio).then(rows=>{
		if (!rows) {
			res.status(404).send({resp:'Sin resultados',
				message:'No se encontraron puntos de servicios'});
		}else{
			res.status(200).send({
				resp:'Puntos de Servicios',
				PuntosdeServicio:rows
			})
		}
	}).catch(error=>{
		res.status(500).send({resp:'Error',error:`${error}`});
	})
}

function getpuntoServicios(req, res) {
	CONN('puntoservicio').select('*').then(rows=>{
		if (!rows) {
			res.status(404).send({resp:'Sin resultados',
				message:'No se encontraron puntos de servicios'});
		}else{
			res.status(200).send({
				resp:'Servicios',
				PuntosdeServicio:rows
			})
		}
	}).catch(error=>{
		res.status(500).send({resp:'Error',error:`${error}`});
	})
}

function deletepuntoServicio(req,res){
	let idPuntoservicio = req.params.idPuntoservicio;
	CONN('puntoservicio').where('idPuntoservicio', idPuntoservicio)
	.del().then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se eliminó correctamente'})
		}else{
			// res.status(200).send({resp:'Datos actualizados correctamente',administrador:result})
			CONN('puntoservicio').select().where('idPuntoservicio',idPuntoservicio).then(puntoservicio=>{
				if (!puntoservicio) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',puntoservicio:puntoservicio,message:'Punto de Servicio eliminado correctamente'});
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

function dabajapuntoServicio (req, res){
	let idPuntoservicio = req.params.idPuntoservicio;
	CONN('puntoservicio').where('idPuntoservicio', idPuntoservicio).update('statusPuntoservicio', 0).then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se actualizo correctamente'})
		}else{
			CONN('puntoservicio').select().where('idPuntoservicio',idPuntoservicio).then(client=>{
				if (!client) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',cliente:client,message:'Punto de servicio dado de baja'});
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

function daaltapuntoServicio (req, res){
	let idPuntoservicio = req.params.idPuntoservicio;
	CONN('puntoservicio').where('idPuntoservicio', idPuntoservicio).update('statusPuntoservicio', 1).then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se actualizo correctamente'})
		}else{
			CONN('puntoservicio').select().where('idPuntoservicio',idPuntoservicio).then(client=>{
				if (!client) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',cliente:client,message:'Punto de servicio dado de alta'});
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

function buscapuntoServicios(req,res){
	let idServicio_Puntoservicio = req.params.idServicio_Puntoservicio;
	CONN('puntoservicio').select('*').where('idServicio_Puntoservicio', idServicio_Puntoservicio).then(rows=>{
		if (!rows) {
			res.status(404).send({resp:'Sin resultados',
				message:'No se encontraron puntos de servicios'});
		}else{
			res.status(200).send({
				resp:'Puntos de Servicios',
				PuntosdeServicio:rows
			})
		}
	}).catch(error=>{
		res.status(500).send({resp:'Error',error:`${error}`});
	})
}

module.exports = {
	crearpuntoServicio,
	actualizapuntoServicio,
	deletepuntoServicio,
	getpuntoServicios,
	vepuntoServicios,
	daaltapuntoServicio,
	dabajapuntoServicio,
	buscapuntoServicios
}