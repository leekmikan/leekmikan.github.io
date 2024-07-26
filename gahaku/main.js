var ms = new Audio();
var cmp = [];
ms.preload = "auto";
ms.src = "snd/TENRANKAI.mp3";
ms.load();
ms.addEventListener("ended", function () {
      ms.currentTime = 0;
      ms.play();
    }, false);
var rand = 0;
var playing = false;
function Ans(){
	if(qs[rand].ans == document.getElementById("ans").value){
		if(qs[rand].genre = "Songs"){
			Get_Star(3);
		}else{
			Get_Star(1);
		}
		if(!cmp.includes(rand)){
			cmp.push(rand);
			document.getElementById("td" + rand).style.background = "#FF0000";
			document.getElementById("cmp").innerText = cmp.length + "/" + qs.length + "　(" + Math.round(cmp.length / qs.length * 1000) / 10 + "%)";
		}
		alert("正解!");
		Change(rd());
	}
}
function rd(){
	return Math.floor( Math.random() * qs.length );
}
function Change(x){
	rand = x;
	document.getElementById("ans").value = "";
	document.getElementById("no").innerText = "No." + (x + 1);
	document.getElementById("genre").innerText = qs[rand].genre;
	document.getElementById("pic").src = "img/Q" + x + ".jpg";
}
function Plps(){
	if(!playing){
		playing = true;
		ms.currentTime = 0;
      	ms.play();
		document.getElementById("mb").innerText = "BGM: ON";
	}else{
		playing = false;
		ms.pause();
    		ms.currentTime = 0;
		document.getElementById("mb").innerText = "BGM: OFF";
	}
}
function Selp(n){
    if(true){
        n++;
		if(n <= 0){
			n = 1;
		}else if(qs.length < n){
			n = qs.length;
		}
		Change(n - 1);
	}
}
function Start(){
	document.getElementById("start").style.display = "none";
	document.getElementById("ytb").style.display = "none";
	document.getElementById("main").style.display = "block";
	Plps();
	ms.currentTime = 89.7;
}
document.getElementById("ques_val").innerText = qs.length;
document.getElementById("nol").innerText = Math.round(qs.length * 0.4);
function Get_Star(x){
	if (window.localStorage) {
		let tmp = 0;
		let data = localStorage.getItem('player_star');
		if(data){
			tmp = JSON.parse(data);
			tmp += x;
		}
		else{
			tmp = x;
		}
	let jtmp = JSON.stringify(tmp, undefined, 1);
	localStorage.setItem('player_star', jtmp);
	}
}
window.addEventListener('beforeunload', (event) => {
	if (window.localStorage) {
		let tmp = JSON.stringify(cmp, undefined, 1);
		localStorage.setItem('gahaku_cmp', tmp);
	}
});
if (window.localStorage) {
	let data = localStorage.getItem('gahaku_cmp');
	if(data){
		cmp = JSON.parse(data);
	}
}
for(var i = 0;i < cmp.length;i++){
	document.getElementById("td" + cmp[i]).style.background = "#FF0000";
}
document.getElementById("cmp").innerText = cmp.length + "/" + qs.length + "　(" + Math.round(cmp.length / qs.length * 1000) / 10 + "%)";
window.onload = function() {
   document.getElementById("loading").style.display = "none";
   document.getElementById("start").style.display = "block";
}