let express = require('express');
let puntoServicio = require('../controllers/puntosServicio');




let api = express.Router();

// api.post('/registraAdministrador', upload.single('imagenAdministrador'), Administrador.registraAdministrador);

api.post('/crearpuntoServicio', puntoServicio.crearpuntoServicio);

api.put('/actualizapuntoServicio/:idPuntoservicio', puntoServicio.actualizapuntoServicio);

api.get('/vepuntoServicios/:idPuntoservicio', puntoServicio.vepuntoServicios);

api.get('/getpuntoServicios', puntoServicio.getpuntoServicios)

api.delete('/deletepuntoServicio/:idPuntoservicio', puntoServicio.deletepuntoServicio);

api.put('/daaltapuntoServicio/:idPuntoservicio', puntoServicio.daaltapuntoServicio);

api.put('/dabajapuntoServicio/:idPuntoservicio', puntoServicio.dabajapuntoServicio);

api.get('/buscapuntoServicios/:idServicio_Puntoservicio', puntoServicio.buscapuntoServicios);


module.exports = api;

