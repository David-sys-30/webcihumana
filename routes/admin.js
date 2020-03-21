let express = require('express');
let Administrador = require('../controllers/user_controller');
let multer = require('multer');
let path = require('path');
let md_auth = require('../middlewares/authenticate');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'imgs/Administrador')
  },
  filename: function (req, file, cb) {
    cb(null, `${req.params.idAdministrador}-${file.originalname}`);
  }
});
let upload = multer({ storage: storage,
	fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    } 
});




let api = express.Router();

// api.post('/registraAdministrador', upload.single('imagenAdministrador'), Administrador.registraAdministrador);

api.post('/registraAdministrador', Administrador.registraAdministrador);

api.put('/actualizaAdministrador/:idAdministrador', md_auth.ensureAuth, Administrador.actualizaAdministrador);

api.post('/loginAdministrador', Administrador.loginAdministrador);

api.get('/obtenerAdministradores', Administrador.getAdministradores);

api.put('/subeImagen/:idAdministrador', upload.single('fotoAdministrador'), Administrador.subeImagen);
api.get('/getImagen/:fotoAdministrador', Administrador.getImageFile);


module.exports = api;

