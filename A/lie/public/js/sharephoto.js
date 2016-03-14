function statusChangeCallback(response){
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected'){
      testAPI();
    }
    else if (response.status === 'not_authorized'){
    }
    else {
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response){
    	statusChangeCallback(response);
    });
}

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

function testAPI() {
	FB.api('/me', function(response) {
		console.log('Successful login for: ' + response.name);
	});
}
