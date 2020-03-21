let express = require('express');
let Curso = require('../controllers/cursos');
let multer = require('multer');
let md_auth = require('../middlewares/authenticate');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'imgs/Curso')
  },
  filename: function (req, file, cb) {
    cb(null, `${req.params.idCurso}-${file.originalname}`);
  }
});
let upload = multer({ storage: storage });

let api = express.Router();

api.get('/getCurso', Curso.getCurso);
api.post('/creaCurso', Curso.creaCurso);
api.put('/actualizaCurso/:idCurso', Curso.actualizaCurso);
api.delete('/eliminaCurso/:idCurso', Curso.eliminaCurso);
api.get('/veCurso/:idCurso', Curso.veCurso);
api.post('/subeImagenCurso/:idCurso', upload.single('image'), Curso.subeImagen);
api.get('/getImageFileC/:imagenCurso', Curso.getImageFileCurso);
api.put('/dabajaCurso/:idCurso', Curso.dabajaCurso);
api.put('/daaltaCurso/:idCurso', Curso.daaltaCurso);


module.exports = api;