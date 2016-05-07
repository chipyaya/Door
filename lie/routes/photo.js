var express = require('express');
var router = express.Router();
var https = require('https');
var bodyParser = require('body-parser');
var FB = require('fb');
var fs = require("fs");
var request = require('request');
var imgur = require('imgur');
var qr = require('qr-image');
var FormData = require('form-data');
var exec = require('child_process').execFile;
var exec_command = require('child_process').exec;
var cal = require('../calculate.js');

router.get('/', function(req, res){
	res.render('index');
})

var lastpulse;

router.get('/detectstart', function(req, res){
	fs.readFile('hardware/heartBeat/heartBeat.txt', 'utf8', function(err,data){
		if(parseInt(data) > lastpulse)
			res.json({result:1});
		else
			res.json({result:0});
	});
})

router.get('/clean', function(req, res){
	cal.qs = [];
	cal.ans = [];
	cal.timerecord = [];
	cal.pulserecord = [];
	res.end();
})

router.get('/questions', function(req, res){
	cal.qs = [];
	cal.ans = [];
	cal.timerecord = [];
	cal.pulserecord = [];
	var d = new Date();
	cal.timerecord.push(d.getTime());
	// Read pulserecord number from pulserecord.txt
	fs.readFile('hardware/heartBeat/heartBeat.txt', 'utf8', function(err,data){
		cal.pulserecord.push(parseInt(data));
	});
	res.render('questions');
});

router.post('/Q', function(req, res){
	console.log(req.body.qnum, req.body.ans);
	// Read pulserecord number from pulserecord.txt
	fs.readFile('hardware/heartBeat/heartBeat.txt', 'utf8', function(err,data){
		if (err) throw err;
		//recode time and pulserecord number per question
		var d = new Date();
		cal.qs.push(req.body.qnum);
		cal.ans.push(req.body.ans);
		cal.timerecord.push(d.getTime());
		cal.pulserecord.push(parseInt(data));
		console.log(cal.timerecord);
	});

	res.end();
})

router.get('/gotoshoot', function(req,res){
	res.render('gotoshoot');
});

router.get('/loading', function(req,res){
	res.render('loading');
});

router.get('/uploadtoimgur', function(req, res){		//call by pressing the button in question.jade
	lastpulse = cal.pulserecord[cal.pulserecord.length-1];
	var level = cal.cal(cal.qs,cal.ans,cal.timerecord,cal.pulserecord);	//depends on %	//depends on %
	//readFile
	fs.readFile('kinect_code/coordinate.txt', 'utf8', function(err,data){
		var strarr = data.split("\n");
		console.log(strarr);
		var filename = parseInt(strarr[0]);
		var centerX = parseInt(strarr[1]);
		var centerY = parseInt(strarr[2]);
		var shoulderW = parseFloat(strarr[4]) - parseFloat(strarr[3]);

		//processing the image
		exec('processImg/commands.sh', [level, filename, centerX, centerY, shoulderW], function(err, data){	
			console.log(err);
			console.log(data.toString());                       
			var albumId = 'fGZi1';
			imgur.uploadFile('public/img/composite.png', albumId)	//upload to imgur
				.then(function (json) {
					var photourl = json.data.link
					console.log(photourl);
					res.end();
				})
				.catch(function (err) {
					console.error(err.message);
				});
		}); 
	});
});															// return to sharephoto.js

router.get('/share', function(req, res){			//call by pressing the button in questions.jade
	res.render('sharephoto');
});

router.get('/makeqrcode', function(req,res){		//call by pressing the button in sharephoto.jade
	var qrcode = qr.image('http://i.imgur.com/96ySytj.png', { type: 'svg' });	
	res.type('svg');
	qrcode.pipe(res);
});


router.post('/uploadtofb', function(req, res){		//call by sharephoto.js

	var ACCESS_TOKEN = req.body.token;
	var message = req.body.message;

	var form = new FormData(); //Create multipart form
	form.append('file', fs.createReadStream('public/img/composite.png')); //Put file
	form.append('message', message); //Put message

	var options = {
	    method: 'post',
	    host: 'graph.facebook.com',
	    path: '/me/photos?access_token='+ACCESS_TOKEN,
	    headers: form.getHeaders()
	}
	 
	var request = https.request(options, function (res){
	     console.log(res);
	});
	 
	form.pipe(request);
	res.end();
})


module.exports = router;
