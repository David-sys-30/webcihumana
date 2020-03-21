let express = require('express');
let nuevosClientes = require('../controllers/nuevos_clientes');


let api = express.Router();

api.get('/obtenernuevosClientes', nuevosClientes.getnuevosClientes);
api.get('/obtenernuevoCliente/:idProspectocita', nuevosClientes.getnuevoCliente);
api.post('/registrarnuevoCliente', nuevosClientes.registrarnuevoCliente);
api.delete('/eliminanuevoCliente/:idProspectocita', nuevosClientes.deletenuevoCliente);
api.put('/dabajanuevoCliente/:idProspectocita', nuevosClientes.dabajanuevoCliente);
api.put('/daaltanuevoCliente/:idProspectocita', nuevosClientes.daaltanuevoCliente);

module.exports = api;