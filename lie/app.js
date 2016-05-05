var express = require('express');
var path = require('path');
var https = require('https');
var bodyParser = require('body-parser');
var imgur = require('imgur');
var routes = require('./routes/photo');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

imgur.setCredentials('anndad1993@yahoo.com.tw', 'loodoor12345', '2e501adb452625d');


app.post('/ratio', function(req, res){
	fs.readFile('ratio.txt', 'utf8', function(err,data){
		parseInt(data);
	})
})

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
