module.exports = function(app){
	app.get('/', function(req, res){
		res.render('index')
	})
	app.get('/Q1', function(req, res){
		res.render('Q1')
	})
	app.get('/Q2', function(req, res){
		res.render('Q2')
	})
}
