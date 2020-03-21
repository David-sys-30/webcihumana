let express = require('express');
let EmailCtrl = require('../controllers/aspirantes');
let multer = require('multer');
let path = require('path');
let api = express.Router();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'docs/cv')
  },
  filename: function (req, file, cb) {
    cb(null, `${req.params.idAspirante}-${file.originalname}`);
  }
});
let upload = multer({ storage: storage,
	fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.doc' && ext !== '.docx' && ext !== '.pdf') {
        	req.fileValidationError = 'Only docs are allowed';
            return callback(new Error('Only docs are allowed'))
        }
        callback(null, true)
    } 
});


api.get('/aspirantes', EmailCtrl.getAspirantes);
api.post('/registrarAspirante', EmailCtrl.registrarAspirantes);
api.get('/aspirante/:idAspirante', EmailCtrl.getAspirante);
api.delete('/eliminarAspirante/:idAspirante', EmailCtrl.deleteAspirantes);
// api.put('/subecv/:idAspirante', upload.single('cvAspirante'), EmailCtrl.subeCV);
api.put('/subecv/:idAspirante', upload.single('cvAspirante'), EmailCtrl.subeCV);
api.get('/obtenercv/:cvAspirante', EmailCtrl.getCV);
api.put('/desactivarAspirante/:idAspirante', EmailCtrl.deactivateAspirante);
api.put('/activarAspirante/:idAspirante', EmailCtrl.activateAspirante);

api.get('/fechaconmoment', EmailCtrl.fecha);




module.exports = api;


// function(req,res,next){

//   let upload = multer({ storage:storage,
//     fileFilter: function (req, file, callback) {
//         let ext = path.extname(file.originalname);
//         if(ext !== '.doc' && ext !== '.docx' && ext !== '.pdf') {
//           req.fileValidationError = 'Sólo documentos .doc, .docx o .pdf permitidos';
//             return callback(new Error('Only docs are allowed'))
//         }
//         callback(null, true)
//     } 
// }).single('cvAspirante');
//   upload(req,res,function(err){   
//       console.log(req.file);
//       if(err){
//         res.json({success:false,message:req.fileValidationError});
//       }
//       else{
//         res.json({success:true,message:"CV subido"});
//       } 
//   })
// }