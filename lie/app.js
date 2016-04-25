var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require("fs");
var FB = require('fb');
var FormData = require('form-data');
var request = require('request');
var https = require('https');
var imgur = require('imgur');
var qr = require('qr-image');
var exec = require('child_process').execFile;
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

imgur.setCredentials('anndad1993@yahoo.com.tw', 'loodoor12345', '2e501adb452625d');

// About the content of all questions and the next question number(or result page)

var time=[];
var pulse=[];
var averagePulsePerQ=[];
var photourl="";

app.get('/', function(req, res){
	res.render('index');
})

app.get('/questions', function(req, res){
	res.render('questions');
});

app.post('/Q/:qnum', function(req, res){
	// Read pulse number from pulse.txt
	fs.readFile('pulse.txt', 'utf8', function(err,data){
		if (err) throw err;
		//recode time and pulse number per question
		var d = new Date();
		time.push(d.getTime());
		pulse.push(parseInt(data));
		console.log('time',time,'pulse',pulse);
	});

	// Go to the next question according to questions[]
	//res.send({Q:questions[parseInt(req.params.qnum)-1]});
	res.end();
})

app.get('/loading', function(req,res){
	res.render('loading');
});

app.get('/calculate', function(req,res){
	res.end();
});

app.get('/uploadtoimgur', function(req, res){		//call by pressing the button in question.jade
	var level = 1;	//depends on %
	var centerX = 100;
	var centerY = 100;
	var shoulderW = 400;
	//processing the image
	exec('./processImg/commands.sh', [level, centerX, centerY, shoulderW], function(err, data){	
		console.log(err);
		console.log(data.toString());                       
		var albumId = 'fGZi1';
		imgur.uploadFile('public/img/composite.png', albumId)	//upload to imgur
		    .then(function (json) {
		    	photourl = json.data.link
		    	console.log(photourl);
				res.end();
		    })
		    .catch(function (err) {
		        console.error(err.message);
		    });
	}); 
});															// return to sharephoto.js

app.get('/share', function(req, res){			//call by pressing the button in questions.jade
	res.render('sharephoto');
});

app.get('/makeqrcode', function(req,res){		//call by pressing the button in sharephoto.jade
	var qrcode = qr.image('http://i.imgur.com/96ySytj.png', { type: 'svg' });	
	res.type('svg');
	qrcode.pipe(res);
});


app.post('/uploadtofb', function(req, res){		//call by sharephoto.js

	var token = req.body.token;
	var name = req.body.name;
	var message = req.body.message;
	
	var ACCESS_TOKEN =token;

	var form = new FormData(); //Create multipart form
	form.append('file', fs.createReadStream('public/img/bg.png')); //Put file
	form.append('message', message); //Put message

	var options = {
	    method: 'post',
	    host: 'graph.facebook.com',
	    path: '/me/photos?access_token='+ACCESS_TOKEN,
	    headers: form.getHeaders(),
	}
	 
	var request = https.request(options, function (res){
	     console.log(res);
	});
	 
	form.pipe(request);
	res.end();
})

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
