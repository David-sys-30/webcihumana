let express = require('express');
let Personal = require('../controllers/personal');
let multer = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'imgs/Personal')
  },
  filename: function (req, file, cb) {
    cb(null, `${req.params.idPersonal}-${file.originalname}`);
  }
});
let upload = multer({ storage: storage });

let api = express.Router();

api.get('/obtenerPersonal', Personal.getPersonal);
api.post('/creaPersonal', Personal.creaPersonal);
api.put('/actualizaPersonal/:idPersonal', Personal.actualizaPersonal);
api.delete('/eliminaPersonal/:idPersonal', Personal.eliminaPersonal);
api.put('/subeImagenPersonal/:idPersonal', upload.single('fotoPersonal'), Personal.subeImagenPersonal);
api.get('/getImageFilePersonal/:fotoPersonal', Personal.getImageFilePersonal);
api.get('/vePersonal/:idPersonal', Personal.vePersonal);
api.put('/daaltaPersonal/:idPersonal', Personal.daaltaPersonal);
api.put('/dabajaPersonal/:idPersonal', Personal.dabajaPersonal);

module.exports = api;