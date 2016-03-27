(function(){
	var loadDiv = document.getElementById("center");
	var imgDiv = document.getElementById("center2");
	var show = function(){
		loadDiv.style.display = "block";
		setTimeout(hide, 5000);  // 5 seconds
	}

	var hide = function(){
		loadDiv.style.display = "none";
		imgDiv.style.display = "block";
	}
	show();
})();
