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
				});
	    	});
 		    
			
			
 		     
		});
	}, {scope: 'publish_actions'});    
}

function checkLoginState() {
	FB.getLoginStatus(function(response) {
	    statusChangeCallback(response);
	});

}

function restart(){
	FB.logout(function(response) {});
	window.location.replace('/');
}

function uploadtofb(){
	checkLoginState();
}

function uploadtoimgur(){
	$('#loading').css('display','block');
	$('.content').css('display','none');
	$.get('/uploadtoimgur',function(result){
		window.location.href='/share';
		photourl = result;
		console.log('result',result);
	});
}

function makeqrcode(){
	$.get('/makeqrcode',function(data){
		$('#qrcode').attr('src','makeqrcode');
		console.log(data);
		$('#success_notice_qrcode').fadeIn();
	});
}



