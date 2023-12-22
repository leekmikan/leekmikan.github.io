var len = 0;
var music = [new Audio("snd/miss0.wav"),new Audio("snd/miss1.wav")];
var res = 0;
var esize = 0;
var miss = 0;
var hint_req = [1,2,3,5,8,10,15,20];
var sel = 0;
function ipt(x){
    if(len < 5){
        var tmp = "";
        var str = document.getElementById("num").innerText;
        for(var i = 4;i > 4 - len;i--){
            tmp = str[i] + tmp;
        }
        for(var i = 0;i < 4 - len;i++){
            tmp = "-" + tmp;
        }
        tmp += x;
        document.getElementById("num").innerText = tmp;
        len++;
    }
}
function cr(){
    len = 0;
    document.getElementById("num").innerText = "-----";
}
function et(){
    if(document.getElementById("num").innerText == "75075"){
        document.getElementById("main").style.display = "none";
        document.getElementById("akeome").style.display = "block";
    }else{
        res = -1;
        document.getElementById("main").style.display = "none";
	sel = Math.floor(Math.random() * 2);
        music[sel].play();
    }
}
function cont(){
    document.getElementById("main").style.display = "block";
    document.getElementById("cont").style.display = "none";
    res = 0;
    if(len >= 5){
        miss++;
        hints();
    }
    set_data(miss,"secret_miss");
    cr();
}
setInterval(function(){
    switch (res){
		case -1:
			document.body.style.backgroundImage = 'url(img/null.png)';
			esize += 8;
			document.body.style.backgroundSize = esize + "px";
			if(esize > 100)esize = 0;
			if(music[sel].currentTime >  11){
				res = -2;
				document.getElementById("cont").style.display = "block";
				document.body.style.background = "#000000";
				music[sel].pause();
    			music[sel].currentTime = 0;
			}
		break;
    }
}, 100);
function set_data(data,str){
    if (window.localStorage) {
		let jsd = JSON.stringify(data, undefined, 1);
		localStorage.setItem(str, jsd);
	}
}
function get_data(str){
    if (window.localStorage) {
        let data = localStorage.getItem(str);
		if(data){
			return JSON.parse(data);
		}
        return null;
	}
}
function hints(){
    for(var i = 0;i < hint_req.length;i++){
        document.getElementById("h" + i).style.display = (miss >= hint_req[i]) ? "block" : "none";
    }
}
miss = get_data("secret_miss");
hints();