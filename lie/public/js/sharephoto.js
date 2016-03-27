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

function statusChangeCallback(response) {
	
	
	FB.login(function(response) {
	
	var access_token = response.authResponse.accessToken;

	    FB.api('/me', function(response) {
			var user_name = response.name;
			var user_id = response.id;
			$.post('/upload',{token:access_token, name:user_name},function(result){
				$('#success_notice').show();
			});
		});
	}, {scope: 'publish_actions'});    
}

function checkLoginState() {
	FB.getLoginStatus(function(response) {
	    statusChangeCallback(response);
	});

}

function logout(){
	FB.logout(function(response) {	
  		window.location.href='/';
	});
}
