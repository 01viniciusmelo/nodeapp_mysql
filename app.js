var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

/* MySQL - Funções */
var database = 'myappdev';
var table = 'contatos';

var client = mysql.createConnection({
	user: 'root',
	password: '123abc',
	host: 'localhost',
	port: 3306,
	database: app.database
});

client.query('CREATE DATABASE '+ database +' DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci');

client.query('USE ' + database);

client.query('CREATE TABLE IF NOT EXISTS '+ table + ' ( ' +
	'ID int(10) unsigned NOT NULL AUTO_INCREMENT,' +
	'NOME varchar(80) COLLATE utf8_unicode_ci NOT NULL,' +
    'EMAIL varchar(80) COLLATE utf8_unicode_ci NOT NULL,' +
    'PRIMARY KEY (id)' +
    ') ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1');

client.query(
	'INSERT INTO ' + table + ' ' + 
	'SET ID = ?, NOME = ?, EMAIL = ?', 
	['1', 'contato1', 'contato1@gmail.com']
);

client.query(
	'INSERT INTO ' + table + ' ' + 
	'SET ID = ?, NOME = ?, EMAIL = ?', 
	['2', 'contato2', 'contato2@gmail.com']
);

client.query(
	'INSERT INTO ' + table + ' ' + 
	'SET ID = ?, NOME = ?, EMAIL = ?', 
	['3', 'contato3', 'contato3@gmail.com']
);

client.query(
	'INSERT INTO ' + table + ' ' + 
	'SET ID = ?, NOME = ?, EMAIL = ?', 
	['4', 'contato4', 'contato4@gmail.com']
);

client.query(
	'INSERT INTO ' + table + ' ' + 
	'SET ID = ?, NOME = ?, EMAIL = ?', 
	['5', 'contato5', 'contato5@gmail.com']
);

client.query(
	'INSERT INTO ' + table + ' ' + 
	'SET ID = ?, NOME = ?, EMAIL = ?', 
	['6', 'contato6', 'contato6@gmail.com']
);

app.use('/contatos', function(req, res) {
	client.query('SELECT * FROM ' + table, 
		function(err, results, fields) {
			if (err)
				throw err;
		
		res.send(results)});
});

/* Fim MySQL - Funções */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;