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

function checkLoginState() {
	FB.login(function(response) {
		if (response.status === 'connected'){
	    	post();
	    }
	    else if (response.status === 'not_authorized'){
	    }
	    else {
	    }
	  // handle the response
	}, {scope: 'publish_actions'});

}

var access_token;
var user_id;

function post(){

	
	//var encodedPng = data.substring(data.indexOf(',') + 1, data.length);
  	//var decodedPng = Base64Binary.decode(encodedPng);
  	//console.log(decodedPng);
	
	FB.api('/me', function(response) {
		user_name = response.name;
		user_id = response.id;
		
		console.log('Successful login for: ' + response.name);
		FB.api('/me/photos', 'post', {
	        message: user_name+' is a Loser',
	        url: 'http://media.premiumtimesng.com/wp-content/files/2015/10/snake-medicine.jpg'
	    }, function (response) {

	        if (!response || response.error) {
	            console.log(response);
	        } else {
	            $('#success_notice').show();
	        }

	    });
	});


}

function logout(){
	FB.logout(function(response) {	
  		window.location.href='/';
	});
}
