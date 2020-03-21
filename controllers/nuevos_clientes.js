'use strict'

let nuevosClientes = require('../models/nuevos_clientes');
const CONN = require('./connection');
let jwt = require('../services/jwt');
let path = require('path');
let fs = require('fs');
let nodemailer = require('nodemailer');

// email sender function
function registrarnuevoCliente(req, res){
// Definimos el transporter
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'ermedpei2109@gmail.com',
            pass: 'hidankakashi21'
        }
    })
// Definimos el email
let mailOptions = {
    from: '"CI Humana" <user>',
    to: req.body.correoProspectocita,
    subject: 'This is a Test Email',
    // cc: 'gerardozamudio45@hotmail.com',
    text: 'This is a Test Email'
}
// Enviamos el email
transporter.sendMail(mailOptions, function(error, info){
    if (error){
        res.status(500).send({resp:'No se envío',
				message:error});
    } else {
    	let date = new Date();
    	let dd = date.getDate();
		let mm = date.getMonth()+1; 
		let yyyy = date.getFullYear();
    	let nuevoCliente = new nuevosClientes(
		req.body.nombreProspectocita, 
		req.body.correoProspectocita, 
		req.body.companiaProspectocita,
		req.body.telefonoProspectocita,
		yyyy + "/" + mm + "/" + dd,
		req.body.comentariosProspectocita);
    	//Prueba ingresar a base si se envia
    	CONN('prospectocita').select().where('correoProspectocita',req.body.correoProspectocita)
		.then(row=>{
		if (row.length > 0) {
			res.status(200).send({mensaje:'El correo que quieres registrar ya esta registrado, intenta con otro'})
		}else{
			CONN('prospectocita').insert(nuevoCliente).then(idProspectocita=>{
				if (!idProspectocita) {
					res.status(500).send({resp:'Error', error: 'No se agregó el interesado'});
				}else{
					res.status(200).send({
						resp:'Prospecto registrado',
						idProspectocita:idProspectocita
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
})
}
function getnuevosClientes(req,res){
	CONN('prospectocita').select('*').then(rows=>{
		if (!rows) {
			res.status(404).send({resp:'Sin resultados',
				message:'No se encontraron nuevos prospectos'});
		}else{
			res.status(200).send({
				resp:'Prospectos',
				prospectos:rows
			})
		}
	}).catch(error=>{
		res.status(500).send({resp:'Error',error:`${error}`});
	})
}

function getnuevoCliente(req,res){
	let idProspectocita = req.params.idProspectocita;
	CONN('prospectocita').where('idProspectocita', idProspectocita).then(rows=>{
		if (!rows) {
			res.status(404).send({resp:'Sin resultados',
				message:'No se encontró el prospecto'});
		}else{
			res.status(200).send({
				resp:'Prospectos',
				prospecto:rows
			})
		}
	}).catch(error=>{
		res.status(500).send({resp:'Error',error:`${error}`});
	})
}

function deletenuevoCliente(req,res){
	let idProspectocita = req.params.idProspectocita;
	CONN('prospectocita').where('idProspectocita', idProspectocita)
	.del().then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se eliminó correctamente'})
		}else{
			// res.status(200).send({resp:'Datos actualizados correctamente',administrador:result})
			CONN('prospectocita').select().where('idProspectocita',idProspectocita).then(prospecto=>{
				if (!prospecto) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',prospecto:prospecto,message:'Prospecto eliminado correctamente'});
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

function dabajanuevoCliente (req, res){
	let idProspectocita = req.params.idProspectocita;
	CONN('prospectocita').where('idProspectocita', idProspectocita).update('statusProspectocita', 0).then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se actualizo correctamente'})
		}else{
			CONN('prospectocita').select().where('idProspectocita',idProspectocita).then(statusProspectocita=>{
				if (!statusProspectocita) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',statusProspectocita:statusProspectocita[0],message:'Cliente nuevo dado de baja'});
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

function daaltanuevoCliente (req, res){
	let idProspectocita = req.params.idProspectocita;
	CONN('prospectocita').where('idProspectocita', idProspectocita).update('statusProspectocita', 1).then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se actualizo correctamente'})
		}else{
			CONN('prospectocita').select().where('idProspectocita',idProspectocita).then(statusProspectocita=>{
				if (!statusProspectocita) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',statusProspectocita:statusProspectocita[0],message:'Cliente nuevo dado de alta'});
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



module.exports={
	registrarnuevoCliente,
	getnuevosClientes,
	getnuevoCliente,
	deletenuevoCliente,
	dabajanuevoCliente,
	daaltanuevoCliente
};