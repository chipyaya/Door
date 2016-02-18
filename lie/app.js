var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var questions=[
	{qnum:1, title:"Q1：你單身嗎?", ansA: "當然~我可是正港的魯蛇耶", ansB: "不是~我走魯門只是想體驗當魯蛇的感覺"},
	{qnum:2, title:"Q2：XXXXX", ansA: "OOOOOOO", ansB: "XXXXXXXX"}
];

app.get('/', function(req, res){
	res.render('index');
})

app.get('/sharephoto', function(req, res){
	res.render('sharephoto');
})

app.get('/Q/:qnum', function(req, res){
	if(req.params.qnum > questions.length)
		res.end();
	res.render('questions',{Q:questions[parseInt(req.params.qnum)-1]});
})

app.get('/share', function(req, res){
	res.render('sharephoto');
})

app.post('/A', function(req, res){
	console.log('req.body.ans',req.body.ans);
})

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
