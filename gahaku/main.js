//620*685
var karuta = false;
var ms = new Audio();
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
	if((qs[rand].ans == document.getElementById("ans").value && !karuta) || (qs2[rand] == document.getElementById("ans").value && karuta)){
		alert("正解!");
		Change(rd());
	}
}
function rd(){
	return karuta ? Math.floor( Math.random() * qs2.length ) : Math.floor( Math.random() * qs.length );
}
function Change(x){
	rand = x;
	document.getElementById("ans").value = "";
	if(!karuta){
		document.getElementById("no").innerText = "No." + (x + 1);
		document.getElementById("genre").innerText = qs[rand].genre;
		document.getElementById("pic").src = "img/Q" + x + ".jpg";
	}else{
		document.getElementById("pic").src = "img2/Q" + x + ".jpg";
	}
}
function Plps(){
	if(!playing && !karuta){
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
function Sel(){
	var n = document.getElementById("sel").value;
	if(!isNaN(n)){
		if((0 < n && n <= qs.length && !karuta) || (0 < n && n <= qs2.length && karuta)){
			Change(n - 1);
		}
	}
}
function Start(){
	document.getElementById("start").style.display = "none";
	document.getElementById("ytb").style.display = "none";
	document.getElementById("main").style.display = "block";
	Plps();
	ms.currentTime = 89.7;
}
function Setkaruta(){ //未使用
	karuta = true;
	document.getElementById("pic").style.width = "384px";
	document.getElementById("pic").style.height = "240px";
	document.getElementById("pt").style.visibility = "hidden";
	document.getElementById("no").style.visibility = "hidden";
	document.getElementById("ex").style.display = "none";
	document.getElementById("ytb").style.display = "block";
	document.getElementById("genrex").style.visibility = "hidden";
	document.body.style.backgroundImage = 'url(img2/tatami.jpg)';
}
function Setnormal(){ //未使用
	karuta = false;
	document.getElementById("pic").style.width = "800px";
	document.getElementById("pic").style.height = "800px";
	document.getElementById("pt").style.visibility = "visible";
	document.getElementById("no").style.visibility = "visible";
	document.getElementById("ex").style.display = "block";
	document.getElementById("ytb").style.display = "none";
	document.getElementById("genrex").style.visibility = "visible";
	document.body.style.backgroundImage = '';
}
document.getElementById("ques_val").innerText = ans.length;
