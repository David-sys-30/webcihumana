let express = require('express');
let Cliente = require('../controllers/cliente');
let multer = require('multer');
let md_auth = require('../middlewares/authenticate');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'imgs/Cliente')
  },
  filename: function (req, file, cb) {
    cb(null, `${req.params.idCliente}-${file.originalname}`);
  }
});
let upload = multer({ storage: storage });

let api = express.Router();

api.get('/obtenerClientes', Cliente.getCliente);
api.get('/obtenerCliente/:idCliente', Cliente.getCliente1);
api.post('/creaCliente', Cliente.creaCliente);
api.put('/actualizaCliente/:idCliente', Cliente.actualizaCliente);
api.delete('/eliminaCliente/:idCliente', Cliente.eliminaCliente);
api.put('/subeImagenCliente/:idCliente', upload.single('fotoCliente'), Cliente.subeImagen);
api.get('/getImageFileCliente/:fotoCliente', Cliente.getImageFile);
api.put('/desactivarCliente/:idCliente', Cliente.deactivateCliente);
api.put('/activarCliente/:idCliente', Cliente.activateCliente);
api.get('/getserviciosliente', Cliente.getserviciosliente);
api.get('/getImageFileServicioCliente/:fotoServicio_ClienteServicio', Cliente.getImageFileServicio);

module.exports = api;