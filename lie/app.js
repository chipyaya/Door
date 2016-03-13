var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require("fs");

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
	{qnum:1, title:"你單身嗎", ansA: "是", ansB: "否", Anext:"/Q/2", Bnext:"/Q/2"},
	{qnum:2, title:"你有約會過嗎/有異性（喜歡的那個性別）約過你嗎", ansA: "有", ansB: "沒有", Anext:"/Q/3", Bnext:"/Q/3"},
	{qnum:3, title:"關於工具人", ansA: "我是工具人", ansB: "我有工具人", ansC:"我不是工具人也沒有工具人", Anext:"/Q/4", Bnext:"/Q/4", Cnext:"/Q/5"},
	{qnum:4, title:"你會煮菜嗎", ansA: "會", ansB: "不會", Anext:"/Q/5", Bnext:"/Q/6"},
	{qnum:5, title:"你煮的菜好吃嗎", ansA: "好吃", ansB: "不好吃", Anext:"/Q/6", Bnext:"/Q/6"},
	{qnum:6, title:"你常穿系服/營服/睡衣出門嗎", ansA: "常", ansB: "不常", Anext:"/Q/7", Bnext:"/Q/7"},
	{qnum:7, title:"你常穿拖鞋出門嗎", ansA: "常", ansB: "不常", Anext:"/Q/8", Bnext:"/Q/8"},
	{qnum:8, title:"有參加社團/系隊嗎", ansA: "有", ansB: "無", Anext:"/Q/9", Bnext:"/Q/9"},
	{qnum:9, title:"你常出國旅遊嗎", ansA: "常", ansB: "不常", Anext:"/Q/10", Bnext:"/Q/10"},
	{qnum:10, title:"你熱衷參加社團/系隊等課外活動嗎", ansA: "熱衷", ansB: "不熱衷", Anext:"/Q/11", Bnext:"/Q/11"},
	{qnum:11, title:"你會樂器/唱歌嗎", ansA: "會", ansB: "不會", Anext:"/Q/12", Bnext:"/Q/12"},
	{qnum:12, title:"∫(1+e^2x)dx=?", ansA: "會", ansB: "不會", Anext:"/Q/13", Bnext:"/Q/13"},
	{qnum:13, title:"你覺得自己帥/美嗎", ansA: "是", ansB: "否", Anext:"/Q/14", Bnext:"/Q/14"},
	{qnum:14, title:"你覺得自己魯/溫", ansA: "魯", ansB: "溫", Anext:"/result", Bnext:"/result"}
];


app.get('/', function(req, res){
	res.render('index');
})
var time=[];
var pulse=[];
var averagePulsePerQ=[];

app.get('/result', function(req, res){
	res.render('result');
});

app.get('/Q/:qnum', function(req, res){

	fs.readFile('pulse.txt', 'utf8', function(err,data){
		if (err) throw err;
		var d = new Date();
		time.push(d.getTime());
		pulse.push(parseInt(data));
		console.log('time',time,'pulse',pulse);
	});

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
