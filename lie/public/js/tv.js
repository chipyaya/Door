function draw() {
	$('#pie').highcharts({
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie',
		},
		title: {
			text: ''
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				innerSize: '60%',
				dataLabels: {
					enabled: true,
					distance: -90,
					formatter: function() {
						if(this.percentage!=0)  
							return Math.round(this.percentage)  + '%';
					},
					style:{
						fontFamily: 'Consolas',
						fontSize: '40px'
					}
				}
			},
		},
		series: [{
			name: '比例',
			colorByPoint: true,
			data: [{
				name: 'winner',
				color: '#A5F0B8',
				y: 0.1
				
			}, {
				name: 'loser',
				color: '#84D1F0',
				y: 0.9
			}]
		}]
	});
});

$.post('/ratio', function(data){
    //display content using a basic HTML replacement
	var win = document.getElementById('win_ratio'); 
	win.innerHTML = data; //display output in DOM
	var loo = document.getElementById('loo_ratio'); 
	loo.innerHTML = '123'; //display output in DOM

});
t
