var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cheerio = require("cheerio");
var request = require("request");

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

var astros = [];
var daily_astro;

for(var i = 0; i<12; i++){
  astros.push(i);
}

function changeMarquee(){
  console.log(daily_astro);
}

function get_astro_daily(){
  var date = new Date();
  var month = date.getMonth();
  var day = date.getDate();
  var count = 0;
  daily_astro="";
  
  astros.forEach(function(index,item){
	var astro_url = "http://astro.click108.com.tw/daily_"+item+".php?iAcDay=2016-0"+(month+1)+"-"+day+"&iAstro="+item;
    
    request({
      url: astro_url,
      method: "GET"
    }, function(e,r,b) {

      $ = cheerio.load(b);

      var astro = $(".TODAY_CONTENT h3").text();
      var content = $(".TODAY_CONTENT p:nth-child(3)").text();
	  count++;

      daily_astro+=item+astro+"-"+content+"\n";
      
      if(count == astros.length)  
        changeMarquee();
    });
    
  });
}

get_astro_daily();

app.get('/', function(req, res){
  res.render('index');
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
