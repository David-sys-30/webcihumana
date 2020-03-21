let express = require('express');
let noticiaBlog = require('../controllers/blog');
let multer = require('multer');
let md_auth = require('../middlewares/authenticate');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'imgs/blog')
  },
  filename: function (req, file, cb) {
    cb(null, `${req.params.idNoticiablog}-${file.originalname}`);
  }
});
let upload = multer({ storage: storage });

let api = express.Router();

api.get('/obtenernoticiaBlog', noticiaBlog.getnoticiaBlog);
api.get('/obtenernoticiaidBlog/:idNoticiablog', noticiaBlog.getnoticiaBlog2);
api.get('/obtenernoticiaBlog/:idCategoriablog_Noticiablog', noticiaBlog.getnoticiaBlog1);
api.post('/creanoticiaBlog', noticiaBlog.creanoticiaBlog);
api.put('/actualizanoticiaBlog/:idNoticiablog', noticiaBlog.actualizanoticiaBlog);
api.delete('/eliminanoticiaBlog/:idNoticiablog', noticiaBlog.eliminanoticiaBlog);
api.put('/subeImagenB/:idNoticiablog', upload.single('imagenNoticiablog'), noticiaBlog.subeImagen);
api.get('/getImageFileB/:imagenNoticiablog', noticiaBlog. getImageFileBlog);
api.put('/daaltaBlog/:idNoticiablog', noticiaBlog.daaltaBlog);
api.put('/dabajaBlog/:idNoticiablog', noticiaBlog.dabajaBlog);

module.exports = api;