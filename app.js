
var express = require('express');
var bodyParser = require('body-parser');
var app=express();

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var index = require('./routes/index');
var admin = require('./routes/admin');
var aspirantes = require('./routes/aspirantes');
var servicios = require('./routes/servicios');
var nuevosClientes = require('./routes/nuevos_clientes');
var puntosServicio = require('./routes/puntosServicio');
var clientes = require('./routes/clientes');
var personal = require('./routes/personal');
var noticiaBlog = require('./routes/blog');
var cursos = require('./routes/cursos');
var categorias = require('./routes/categorias');

//var auth = require('./routes/authenticate');


var mysql = require("mysql");
//const port =  process.env.PORT;
const port =  8081;





//Database connection
/*
app.use(function(req, res, next){
	res.locals.connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'root',
		database : 'testing'
	});
	res.locals.connection.connect();
	next();
});
*/

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Acces-Control-Request-Method, enctype, Authorization');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
	res.header('Allow', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

	next();
});
//***Esta linea es para hacer las url con #
// app.use(express.static(path.join(__dirname, 'client')));
//***

//Esta linea es para hacer las url sin #
app.use('/', express.static('client', {redirect: false}));

// app.use('/', index);
app.use('/api', admin);
app.use('/api', aspirantes);
app.use('/api', servicios);
app.use('/api', puntosServicio);
app.use('/api', clientes);
app.use('/api', personal);
app.use('/api', noticiaBlog);
app.use('/api', nuevosClientes);
app.use('/api', cursos);
app.use('/api', categorias);
//app.use('/authenticate', auth);

//Estas lineas son para hacer las url sin #
app.get('*', function(req, res, next){
	res.sendFile(path.resolve('client/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
