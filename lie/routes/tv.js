var express = require('express');
var router = express.Router();

router.get('/tv', function(req, res){
	res.render('tv');
})

module.exports = router;
