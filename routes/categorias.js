let express = require('express');
let Categorias = require('../controllers/categorias');

let api = express.Router();

api.get('/getCategoriaSer', Categorias.getCategoriaSer);
api.get('/getCategoriaSer/:idCategoriaservicio_Servicio', Categorias.getCategoriaSer1);
api.post('/creaCategoriaSer', Categorias.creaCategoriaSer);
api.put('/actualizaCategoriaSer/:idCategoriaservicio_Servicio', Categorias.actualizaCategoriaSer);
api.delete('/eliminaCategoriaSer/:idCategoriaservicio_Servicio', Categorias.eliminaCategoriaSer);
api.get('/getCategoriaBlo', Categorias.getCategoriaBlo);
api.get('/getCategoriaBlo/:idCategoriablog', Categorias.getCategoriaBlo1);
api.post('/creaCategoriaBlo', Categorias.creaCategoriaBlo);
api.put('/actualizaCategoriaBlo/:idCategoriablog', Categorias.actualizaCategoriaBlo);
api.delete('/eliminaCategoriaBlo/:idCategoriablog', Categorias.eliminaCategoriaBlo);

api.put('/deactivatecategoriaBlog/:idCategoriablog', Categorias.deactivatecategoriaBlog);
api.put('/activatecategoriaBlog/:idCategoriablog', Categorias.activatecategoriaBlog);

api.put('/deactivatecategoriaSer/:idCategoriaservicio_Servicio', Categorias.deactivatecategoriaSer);
api.put('/activatecategoriaSer/:idCategoriaservicio_Servicio', Categorias.activatecategoriaSer);

module.exports = api;