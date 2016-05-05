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
var cal = require('../calculate.js');

router.get('/', function(req, res){
	res.render('index');
})

router.get('/clean', function(req, res){
	cal.qs = [];
	cal.ans = [];
	cal.timerecord = [];
	cal.pulse = [];
	res.end();
})

router.get('/questions', function(req, res){
	var d = new Date();
	cal.timerecord.push(d.getTime());
	res.render('questions');
});

router.post('/Q', function(req, res){
	console.log(req.body.qnum, req.body.ans);
	// Read pulse number from pulse.txt
	fs.readFile('hardware/heartBeat/heartBeat.txt', 'utf8', function(err,data){
		if (err) throw err;
		//recode time and pulse number per question
		var d = new Date();
		cal.qs.push(req.body.qnum);
		cal.ans.push(req.body.ans);
		cal.timerecord.push(d.getTime());
		cal.pulse.push(parseInt(data));
	});

	res.end();
})

router.get('/loading', function(req,res){
	res.render('loading');
});

router.get('/uploadtoimgur', function(req, res){		//call by pressing the button in question.jade
	console.log('timerecord',cal.timerecord);
	var level = cal.cal(cal.qs,cal.ans,cal.timerecord,cal.pulse);	//depends on %
	console.log('level',level);
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
		    	var photourl = json.data.link
		    	console.log(photourl);
				res.end();
		    })
		    .catch(function (err) {
		        console.error(err.message);
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

	var token = req.body.token;
	var name = req.body.name;
	var message = req.body.message;
	
	var ACCESS_TOKEN =token;

	var form = new FormData(); //Create multipart form
	form.append('file', fs.createReadStream('public/img/composite.png')); //Put file
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

module.exports = router;
