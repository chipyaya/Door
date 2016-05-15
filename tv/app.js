var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var fs = require('fs');
//var firebase = require('firebase');
var app = express();

//var fbase = new firebase('https://ntuaf-door.firebaseio.com/');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
		console.log('hi');
	res.render('index');
})

app.get('/winloo', function(req, res){
	fs.readFile('./ratio.txt', 'utf8', function(err,data){
		var win = parseInt(data);
		console.log('win = '+win);
		res.json({result: win});
	});
})

app.listen(3001, function () {
	console.log('Example app listening on port 3001!');
});
