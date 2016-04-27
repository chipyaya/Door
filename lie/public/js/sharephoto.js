window.fbAsyncInit = function(){
	FB.init({
		appId      : '970489853040863',
	cookie     : true,
	xfbml      : true,
	version    : 'v2.5'
	});
};

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

var photourl="";

function statusChangeCallback(response) {

	FB.login(function(response) {

		var access_token = response.authResponse.accessToken;

		FB.api('/me', function(response) {
			var user_name = response.name;
			var user_id = response.id;

			$('#fbmessage').fadeIn();
			/*
			$( "#fbmessage" ).dialog({
				modal: true,
			});
			*/

			/*
			function upload(){
			   FB.api('/me/photos', 'post', {
			   message: user_name+' is a Loser',
				//url: photourl
				url: 'http://imgur.com/1i2T4xS'
				}, function (response) {

					if (!response || response.error) {
						console.log(response);
					} else {
						$('#success_notice_fb').fadeIn();
					}
				}); 
				$.post('/uploadtofb',{token:access_token, name:user_name},function(result){
					$('#success_notice').show();
				});
			}
				*/	
$('#fbmessage button').click(function(){
	$.post('/uploadtofb',{token:access_token, name:user_name, message:$('#fbmessage input').val()},function(result){
		$('#fbmessage').hide()
		$('#success_notice_fb').fadeIn();
		/*
		$('#success_notice_fb').dialog({
			height: 500,	//doesn't work!??
			modal: true,
			buttons: {
				Ok: function() {
					$( this ).dialog( "close" );
				}
			}
		});
		*/
	});
});	

});
}, {scope: 'publish_actions'});    
}

function checkLoginState() {				//call by the button "login Fb and upload img" 
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);		//upload img to fb
	});

}

function restart(){                         //call by the button "END"
	FB.logout(function(response) {});       //logout FB account
	window.location.replace('/');           //Go back to / 
}

function uploadtofb(){						//unused?
	checkLoginState();
}

function uploadtoimgur(){

	$('#loading').css('display','block');		//display "loading" animation
	$('.content').css('display','none');		//hide Q14 content
	$.get('/uploadtoimgur',function(result){	//go to app.js
		window.location.href='/share';			//go to /share
	});
}

function makeqrcode(){							//Call by the button "QRcode and download img"
	$.get('/makeqrcode',function(data){
		$('#qrcode').attr('src','makeqrcode');
		//console.log(data);
		$('#success_notice_qrcode').fadeIn();	//display QRcode and the close button
		/*
		$( "#success_notice_qrcode" ).dialog({
			height: 500,	//doesn't work!??
			modal: true,
			buttons: {
				Ok: function() {
					$( this ).dialog( "close" );
				}
			}
		});
		*/
	});
}



