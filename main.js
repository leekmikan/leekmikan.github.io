if (window.localStorage) {
	let tmp = 0;
	let data = localStorage.getItem('player_star');
	if(data){
		tmp = JSON.parse(data);
		document.getElementById("star").innerText = tmp;
	}
}