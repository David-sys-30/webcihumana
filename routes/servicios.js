let express = require('express');
let Servicio = require('../controllers/servicios');




let api = express.Router();

// api.post('/registraAdministrador', upload.single('imagenAdministrador'), Administrador.registraAdministrador);

api.post('/crearServicio', Servicio.crearServicio);

api.put('/actualizaServicio/:idServicio', Servicio.actualizaServicio);

api.get('/veServicio/:idServicio', Servicio.veServicio);

api.get('/getServicios', Servicio.getServicios);

api.delete('/deleteServicio/:idServicio', Servicio.deleteServicio);

api.put('/daaltaServicio/:idServicio', Servicio.daaltaServicio);

api.put('/dabajaServicio/:idServicio', Servicio.dabajaServicio);


module.exports = api;

