function updateClock() {
	var time = [];
	var D = new Date();
	time.push(D.getFullYear()+"."+(D.getMonth()+1)+"."+D.getDate());
	var H = D.getHours();
	var M = D.getMinutes();
	H = (H < 10)? "0"+H : H;
	M = (M < 10)? "0"+M : M;
	time.push(H+":"+M);

	var dayList = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
	time.push(dayList[D.getDay()]);

	document.getElementById('time_ymd').innerHTML = time[0];
	document.getElementById('time_t').innerHTML = time[1];
	document.getElementById('time_day').innerHTML = time[2]; 
	setTimeout(updateClock, 1000);
}
updateClock(); // initial call
