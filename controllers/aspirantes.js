'use strict'

let Aspirante = require('../models/aspirantes');
const CONN = require('./connection');
let jwt = require('../services/jwt');
let path = require('path');
let fs = require('fs');
let nodemailer = require('nodemailer');
let moment = require('moment');

function fecha(req, res){
	
}

//email sender function
async function registrarAspirantes(req, res){
	let fechamoment = moment().format("YYYY-MM-DD");
	let aspirante = new Aspirante (
		req.body.nombreAspirante,
		req.body.apellidopaternoAspirante,
		req.body.apellidomaternoAspirante,
		req.body.correoAspirante,
		req.body.telefonoAspirante,
		req.body.cvAspirante,
		req.body.ocupacionAspirante,
		req.body.statusAspirante = 1,
		req.body.fechaAspirante = fechamoment
		);
	CONN('aspirantes').select().where('correoAspirante', req.body.correoAspirante).then(row=>{
		if (row.length > 0) {
			res.status(200).send({mensaje:'El correo que quieres registrar ya esta dado de alta, intenta con otro'})
		}else {
			//Definimos el transporte
			let transporter = nodemailer.createTransport({
				host: 'smtp.uservers.net',
				port: 587,
				secure: false,
				auth: {
					user: 'adminweb@cihumana.com.mx',
					pass: 'Admcih20'
				},
				tls: {
					minVersion: 'TLSv1',
					rejectUnauthorized: false,
					ignoreTLS: false,
					requireTLS: true
				}
			})
			//Definimos el email
			let mailOptions = {
				from: '"CI Humana" <adminweb@cihumana.com.mx>',
				to: 'capital.humano@cihumana.com.mx',
				// to: 'david.martinez@cihumana.com.mx',
				subject: 'Postulación de Aspirante',
				//cc: 'david.martinez@cihumana.com.mx',
				// text: 'This is Test Email',
				html: "<h1>Hola</h1>"+
					  "<p>Este correo es para notificarte que se acaba de postular un(a) interesad(a) en ser parte de nuestra familia CIHumana:</p>"+
					  "<p>Nombre:"+"<strong>"+  req.body.nombreAspirante +"</strong>"+"</p>"+
					  "<p>Correo:"+"<strong>"+ req.body.correoAspirante +"</strong>"+"</p>"+
					  "<p>Telefono:"+"<strong>"+ req.body.telefonoAspirante +"</strong>"+"</p>" +
					  "<p>Ocupacion:"+"<strong>"+ req.body.ocupacionAspirante + "</strong>"+"</p>"+
					  "<p>Anexo encontraras su CV. Gracias</p>"+
					  "<p>*Por favor no respondas este correo.</p>"+
					  "<p>Saludos!!</p>",
				// 	  '<img src="imgs/Administrador/firma_cihumana.jpg">',
				// attachments: [{
		  //       filename: 'firma_cihumana.jpg',
		  //       path: 'imgs/Administrador/firma_cihumana.jpg',
		  //       contentType:'.jpg',
		  //       cid: 'unique@kreata.ee' //same cid value as in the html img src
		  //   }],
		    attachments: [{
		    	filename: 'firma_cihumana.jpg',
		        path: 'imgs/Administrador/firma_cihumana.jpg',
		    },
		    {	
		    	filename: 'DAE190403_Historias_de_Usuario_CH.pdf',
		        path: 'imgs/DAE190403_Historias_de_Usuario_CH.pdf',
		        // cid: 'hola' //same cid value as in the html img src
		    }]
					  // "<img src='./imgs/Administrador/firma_cihumana.jpg'>"
			}
			//Enviamos el email
			transporter.sendMail(mailOptions, function(error, info){
				if (error) {
					res.status(500).send({resp: 'No se envio',
											message: error});
				}else {
					resp.status(200).send({resp: 'Mensaje Enviado',
											message: info});
					// CONN('aspirantes').insert(aspirante).then(idAspirante=>{
					// 	if (!idAspirante) {
					// 		res.status(500).send({resp: 'Error', error: 'No se insertaron los datos'});
					// 	}else {
					// 		res.status(200).send({
					// 			resp: 'Datos insertados',
					// 			idAspirante:idAspirante
					// 		});
					// 	}
					// }).catch(error =>{
					// 	res.status(500).send({resp: 'error',
					// 			error: `${error}`});
					// });
				}
			})
			res.status(200).send({
				resp:'Consulta Exitosa',
				row:row
			});
		}
	}).catch(error =>{
		res.status(500).send({resp: 'error',
				error: `${error}`});
	  });
}









function getAspirantes(req,res){
	CONN('aspirantes').select('*').then(rows=>{
		if (!rows) {
			res.status(404).send({resp:'Sin resultados',
				message:'No se encontraron aspirantes'});
		}else{
			res.status(200).send({
				resp:'Aspirantes',
				aspirantes:rows
			})
		}
	}).catch(error=>{
		res.status(500).send({resp:'Error',error:`${error}`});
	})
}

function getAspirante(req,res){
	let idaspirante = req.params.idAspirante;
	CONN('aspirantes').where('idAspirante', idaspirante).then(rows=>{
		if (!rows) {
			res.status(404).send({resp:'Sin resultados',
				message:'No se encontraron aspirantes'});
		}else{
			res.status(200).send({
				resp:'Aspirantes',
				aspirante:rows
			})
		}
	}).catch(error=>{
		res.status(500).send({resp:'Error',error:`${error}`});
	})
}

function deleteAspirantes(req,res){
	let idAspirante = req.params.idAspirante;
	CONN('aspirantes').where('idAspirante', idAspirante)
	.del().then(result =>{
		if (!result) {
			res.status(500).send({resp:'Error',error:'No se eliminó correctamente'})
		}else{
			// res.status(200).send({resp:'Datos actualizados correctamente',administrador:result})
			CONN('aspirantes').select().where('idAspirante',idAspirante).then(aspirante=>{
				if (!aspirante) {
					res.status(500).send({resp:'Error',message:'Hubo un error inesperado'})
				}else{
					res.status(200).send({resp:'Exito',aspirante:aspirante,message:'Aspirante eliminado correctamente'});
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


function deactivateAspirante(req,res){
	let idAspirante = req.params.idAspirante;
	CONN('aspirantes').where('idAspirante',idAspirante).update('statusAspirante', 0)
	.then(result=>{
		if (!result) {
			res.status(500).send({resp:'Error',message:'No se actualizó el Status'})
		}else{
			CONN('aspirantes').select('statusAspirante').where('idAspirante',idAspirante)
			.then(statusAspirante=>{
				if (!statusAspirante) {
					res.status(500).send({resp:'Error',message:'error al devolver Status'})
				}
				else{
					res.status(200).send({statusAspirante:statusAspirante[0]});
				}
			}).catch(error=>{
				res.status(404).send({resp:'Error',error:`${error}`});
			})
		}
	}).catch(error=>{
		res.status(404).send({resp:'Error',error:`${error}`});
	})
}

function activateAspirante(req,res){
	let idAspirante = req.params.idAspirante;
	CONN('aspirantes').where('idAspirante',idAspirante).update('statusAspirante', 1)
	.then(result=>{
		if (!result) {
			res.status(500).send({resp:'Error',message:'No se actualizó el Status'})
		}else{
			CONN('aspirantes').select('statusAspirante').where('idAspirante',idAspirante)
			.then(statusAspirante=>{
				if (!statusAspirante) {
					res.status(500).send({resp:'Error',message:'error al devolver Status'})
				}
				else{
					res.status(200).send({statusAspirante:statusAspirante[0]});
				}
			}).catch(error=>{
				res.status(404).send({resp:'Error',error:`${error}`});
			})
		}
	}).catch(error=>{
		res.status(404).send({resp:'Error',error:`${error}`});
	})
}






function subeCV(req,res){
	let idAspirante = req.params.idAspirante;
	let cvAspirante = req.file;
	CONN('aspirantes').where('idAspirante',idAspirante).update('cvAspirante', req.file.filename)
	.then(result=>{
		if (!result) {
			res.status(500).send({resp:'Error',message:'No se actualizó el CV'})
		}else{
			CONN('aspirantes').select('cvAspirante').where('idAspirante',idAspirante)
			.then(cvAspirante=>{
				if (!cvAspirante) {
					res.status(500).send({resp:'Error',message:'error al devolver cv'})
				}
				else{
					res.status(200).send({cvAspirante:cvAspirante[0]});
				}
			}).catch(error=>{
				res.status(404).send({resp:'Error',error:`${error}`});
			})
		}
	}).catch(error=>{
		res.status(404).send({resp:'Error',error:`${error}`});
	})
}

let getCV = (req,res)=>{
	let cvAspirante = req.params.cvAspirante;
	let path_file = `./docs/cv/${cvAspirante}`;
	fs.exists(path_file,(exists)=>{
		if (exists) {
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message:'No existe la Imagen'});
		}
	}); 
}

module.exports={
	registrarAspirantes,
	getAspirantes,
	getAspirante,
	deleteAspirantes,
	subeCV,
	getCV,
	deactivateAspirante,
	activateAspirante,
	fecha
};