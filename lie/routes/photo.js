var express = require('express');
var router = express.Router();
var https = require('https');
var bodyParser = require('body-parser');
var FB = require('fb');
var fs = require('fs');
var request = require('request');
var imgur = require('imgur');
var qr = require('qr-image');
var FormData = require('form-data');
//var exec_cmd = require('child_process').exec;
var cal = require('../calculate.js');
var im = require('imagemagick');

router.get('/', function(req, res){
	res.render('index');
})

var lastpulse;

fs.readFile('hardware/heartBeat/heartBeat.txt', 'utf8', function(err,data){
	lastpulse = parseInt(data);
});

// make it start automatically if it can detect pulse
router.get('/detectstart', function(req, res){
	fs.readFile('hardware/heartBeat/heartBeat.txt', 'utf8', function(err,data){
		console.log(parseInt(data),lastpulse)
		if(parseInt(data) > lastpulse)
			res.json({result:1});
		else
			res.json({result:0});
	});
})

// clean data before begining
router.get('/clean', function(req, res){
	//clean calculate pulse data
	cal.qs = [];
	cal.ans = [];
	cal.timerecord = [];
	cal.pulserecord = [];
	res.end();

	//clean all img under kinect_people folder
	var dirPath = './kinect_code/NTUAF-Recognize/NTUAF-Recognize/images/';
	var files = fs.readdirSync(dirPath); 
	if(files.length > 0){
		for(var i = 0; i < files.length; i++){
			var filePath = dirPath + '/' + files[i];
			if(fs.statSync(filePath).isFile())
				fs.unlinkSync(filePath);
        }
	}
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

router.get('/detectfinish', function(req, res){
	fs.readFile('kinect_code/finish.txt', 'utf8', function(err,data){
		if(parseInt(data) == 1)
			res.json({result:1});
		else
			res.json({result:0});
	});
})

router.get('/gotoshoot', function(req,res){
	// set finish.txt to 0
	fs.writeFile('kinect_code/finish.txt', '0', 'utf8');
	res.render('gotoshoot');
});

router.get('/loading', function(req,res){
	res.render('loading');
});

router.get('/uploadtoimgur', function(req, res){		//call by pressing the button in question.jade
	lastpulse = cal.pulserecord[cal.pulserecord.length-1];
	var level = cal.cal(cal.qs,cal.ans,cal.timerecord,cal.pulserecord);	//depends on %	//depends on %
	//readFile
	fs.readFile('./kinect_code/coordinate.txt', 'utf8', function(err,data){
		//var level
		var strarr = data.split("\r\n");
		var filename_str = strarr[0];

		var centerX = strarr[1];
		var centerY = strarr[2];
		var anotherX = (parseInt(strarr[1]) - 450).toString();
		var path = 'kinect_code/NTUAF-Recognize/NTUAF-Recognize/images/';
		var jpeg_path= path+filename_str+".jpeg";
		var png_path= path+filename_str+".png";
		console.log(jpeg_path);
		console.log(png_path);

		im.convert([jpeg_path, png_path], function(err, stdout){
			if (err) throw err;
			console.log('to png success');
			var ori = path+filename_str+'.png';
			var cir = 'circle '+centerX+','+centerY+' '+anotherX+','+centerY;

			im.convert(['-size', '1290x1080', 'xc:none', '-fill', ori, '-draw', cir, path+'person.png'], function(err, stdout){
				if (err) throw err;
				console.log('crop success');
				var bg_path = './public/img/win_loo/win_loo_'+level.toString()+'.png';
				var x = 700-parseInt(centerX);
				var y = 540-parseInt(centerY)-10;
				var com_path = './public/img/';

				im.convert([bg_path, path+'person.png', '-geometry', '+'+x+'+'+y, '-composite', com_path+'composite.png'], function(err, stdout){
					if (err) throw err;
					console.log('composite success');

					//upload to imgur
					var albumId = 'fGZi1';
					imgur.uploadFile('public/img/composite.png', albumId)	
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

router.get('/magick', function(req, res){

	fs.readFile('./kinect_code/coordinate.txt', 'utf8', function(err,data){
		//var level
		var strarr = data.split("\n");
		var filename_str = strarr[0];
		var centerX = strarr[1];
		var centerY = strarr[2];
		var anotherX = (parseInt(strarr[1]) - 450).toString();
		var path = './kinect_code/NTUAF-Recognize/NTUAF-Recognize/images/';

		im.convert([path+filename_str+'.jpeg', path+filename_str+'.png'], function(err, stdout){
			if (err) throw err;
		var ori = path+filename_str+'.png';
			var cir = 'circle '+centerX+','+centerY+' '+anotherX+','+centerY;
			im.convert(['-size', '1290x1080', 'xc:none', '-fill', ori, '-draw', cir, path+'person.png'], function(err, stdout){
				if (err) throw err;
				console.log('success1');
				var bg_path = './public/img/win_loo/win_loo_1.png';
				var x = 700-parseInt(centerX);
				var y = 540-parseInt(centerY)-10;
				var com_path = './public/img/';
				im.convert([bg_path, path+'person.png', '-geometry', '+'+x+'+'+y, '-composite', com_path+'composite.png'], function(err, stdout){
					if (err) throw err;
					console.log('success2');
				});
			});
		});

	});

});

module.exports = router;