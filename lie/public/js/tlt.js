$(document).ready(function(){
	tlt();
});

var tlt = function(){
  
	$('.tlt_q').textillate({
		selector: '.texts',
		loop: false,
		initialDelay: 20,
		autoStart: true,
		inEffects: [],
		in: {
		  effect: 'fadeInTada',
		  delayScale: 1.5,
		  delay: 40,
		  sync: false,
		  shuffle: false,
		  reverse: false,
		  callback: function () {}
		},
		callback: function () {},
		type: 'char'
	});
	$('.tlt_q').textillate('start')

};
