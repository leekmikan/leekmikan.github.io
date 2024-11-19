var hp = [100,100];
var money = 0;
var cf = new Fdata([],[],[],[]);
var sfl = 0;
var music = new Audio("snd/gameover.wav");
var now = "select";
var esize = 10;
var move = [0,0];
var hkey = new Array(0);
var ceds = 7;
var eds = 7;
var cp = [false,false];
var elen = 0;
var med = 0;
var emaxm = 3;
var edd = [0,1];
var ename = 0;

var elem = document.getElementById('esp');
var target = document.getElementById('espv');
  var rangeValue = function (elem, target) {
    return function(evt){
      target.innerHTML = elem.value;
	  ceds = Number(elem.value);
	  eds = ceds;
    }
  }
 elem.addEventListener('input', rangeValue(elem, target));
setInterval(function(){
	switch(now){
		case "die":
			document.body.style.backgroundImage = 'url(img/enemy' + ename + '.jpg)';
			esize += 4;
			document.body.style.backgroundSize = esize + "px";
			if(esize > 50)esize = 0;
			if(music.currentTime >  11){
				now = "cont";
				document.getElementById("cont").style.display = "block";
				document.body.style.background = "#000000";
				music.pause();
    			music.currentTime = 0;
			}
		break;
		case "droll":
			document.getElementById("msg").innerText = "どこにいこうかな...";
			document.getElementById("dice").innerText = Math.floor(Math.random() * 6 + 1);
		break;
		case "edwait":
			eds--;
			if(eds == 0){
			eds = ceds;
			now = "edroll";
			}
		break;
		case "edroll":
			document.getElementById("dice").innerText = Math.floor(Math.random() * emaxm + 1);
			document.getElementById("msg").innerText = "敵のターン";
			eds--;
			if(eds < 0){
				eds = ceds;
				now = "emove";
				move[1] = Math.floor(Math.random() * emaxm + 1);
				document.getElementById("dice").innerText = move[1];
			}
		break;
		case "emove":
			eds--;
			if(eds <= 0){
				eds = ceds;
				move[1]--;
				var tmp = Math.floor(Math.random() * 4);
				switch(tmp){
					case 0: edd = [-edd[1],edd[0]];break;
					case 1: edd = [edd[1],-edd[0]];break;
				}
				switch(edd.toString()){
					case "0,-1": Emove(0,-1); break;
					case "0,1": Emove(0,1); break;
					case "-1,0": Emove(-1,0); break;
					case "1,0": Emove(1,0); break;
				}
				if(move[1] == 0 && now != "die"){
					now = (elen == cf.enemy.length - 1) ? "droll" : "edroll";
					elen++;
					document.getElementById("dis").innerText = Enedis();
				}
				document.getElementById("dice").innerText = move[1];
			}
		break;
	}
}, 100);
 document.addEventListener('keypress', (event) => {
        var key = event.code;
		switch(now){
			case "droll":
				if(key == "Space"){
					move[0] = Math.floor(Math.random() * 6 + 1);
					now = "pmove";
					document.getElementById("dice").innerText = move[0];
				}
			break;
			case "pmove":
				switch(key){
					case "KeyW": Pmove(0,-1); move[0]--;break;
					case "KeyS": Pmove(0,1); move[0]--;break;
					case "KeyD": Pmove(1,0); move[0]--;break;
					case "KeyA": Pmove(-1,0); move[0]--;break;
				}
				document.getElementById("dice").innerText = move[0];
				document.getElementById("point").innerText = cp[0] ? "(" + cf.player[0] + "," + cf.player[1] + ")" : "?";
				if(move[0] == 0 && now != "die"){
				document.getElementById("dis").innerText = Enedis();
				now = (cf.enemy.length == 0) ? "droll" : "edwait";
				elen = 0;
				}
			break;
		}
});
function Floor_update(){
	var tmp = document.getElementsByClassName("flb");
	for(var i = 0;i < tmp.length;i++){
		tmp[i].style.display = (sfl >= i) ? "block" : "none";
	}
}
Floor_update();
function Enedis(){
	if(cf.enemy.length == 0 || hande[2])return "...";
	var tmp = 999999999;
	for(var i = 0;i < cf.enemy.length;i++){
		tmp = Math.min(tmp,Math.pow(cf.enemy[i][0] - cf.player[0],2) + Math.pow(cf.enemy[i][1] - cf.player[1],2));
	}
	return "" + tmp;
}
function Fs(x){
	cp = [false,false];
	hkey = new Array(0);
	sfl = x;
	cf.field = new Array(field[x].field.length);
	for(var i = 0;i < cf.field.length;i++){
		cf.field[i] = field[x].field[i].concat();
	}
	cf.enemy = new Array(field[x].enemy.length);
	for(var i = 0;i < cf.enemy.length;i++){
		cf.enemy[i] = field[x].enemy[i].concat();
	}
	cf.player = field[x].player.concat();
	cf.goal = field[x].goal.concat();
	document.getElementById("hp").innerText = hp[0] + "/" + hp[1];
	document.getElementById("select").style.display = "none";
	document.getElementById("playing").style.display = "block";
	document.getElementById("msg").innerText = "どこにいこうかな...";
	document.getElementById("dis").innerText = Enedis();
	document.getElementById("med").innerText = med;
	document.getElementById("goal").innerText = cp[1] ? "(" + cf.goal[0] + "," + cf.goal[1] + ")" : "?";
	document.getElementById("point").innerText = cp[0] ? "(" + cf.player[0] + "," + cf.player[1] + ")" : "?";
	now = "droll";
}
function Pmove(x,y){
	if(hande[3]){
		var miss = Math.floor(Math.random() * 10);
		if(miss == 0){
			document.getElementById("msg").innerText = "怖くて動けない";
			return 0;
		}
	}
	if(cf.player[0] + x < cf.field[0].length && cf.player[0] + x >= 0){
		cf.player[0] += x;
	}else{
		document.getElementById("msg").innerText = "いたっ! 壁にぶつかった!";
		return 0;
	}
	if(cf.player[1] + y < cf.field.length && cf.player[1] + y >= 0){
		cf.player[1] += y;
	}else{
		document.getElementById("msg").innerText = "いたっ! 壁にぶつかった!";
		return 0;
	}
	switch(cf.field[cf.player[1]][cf.player[0]]){
		case 0:
			document.getElementById("msg").innerText = "どこにいこうかな...";
		break;
		case 1:
			document.getElementById("msg").innerText = "いたっ! 壁にぶつかった!";
			cf.player[0] -= x;
			cf.player[1] -= y;
		break;
		case 2:
			cp[0] = true;
			cf.field[cf.player[1]][cf.player[0]] = 0;
			document.getElementById("msg").innerText = "位置コンパス獲得!";
			document.getElementById("point").innerText = cp[0] ? "(" + cf.player[0] + "," + cf.player[1] + ")" : "?";
		break;
		case 3:
			cp[1] = true;
			cf.field[cf.player[1]][cf.player[0]] = 0;
			document.getElementById("msg").innerText = "ゴールコンパス獲得!";
			document.getElementById("goal").innerText = cp[1] ? "(" + cf.goal[0] + "," + cf.goal[1] + ")" : "?";
		break;
		default:
		var tmp = (cf.field[cf.player[1]][cf.player[0]] - (cf.field[cf.player[1]][cf.player[0]] % 10)) / 10;
		switch(cf.field[cf.player[1]][cf.player[0]] % 10){
			case 4:
				cf.field[cf.player[1]][cf.player[0]] = 0;
				if(hande[0]){
					document.getElementById("msg").innerText = "鍵獲得!";
				}else{
					document.getElementById("msg").innerText = cl[tmp] + "の鍵獲得!";
				}
				hkey.push(cl[tmp] + "の鍵");
				document.getElementById("key").innerText = Hkey();
			break;
			case 5:
				for(var i = 0;i < hkey.length;i++){
					if(hkey[i] == cl[tmp] + "の鍵"){
						cf.field[cf.player[1]][cf.player[0]] = 0;
						if(hande[0]){
							document.getElementById("msg").innerText = "ドアを開けた";
						}else{
							document.getElementById("msg").innerText = cl[tmp] + "のドアを開けた";
						}
						hkey.splice(i,1);
						document.getElementById("key").innerText = Hkey();
						return 0;
					}
				}
				if(hande[0]){
					document.getElementById("msg").innerText = "ドアが開かない";
				}else{
					document.getElementById("msg").innerText = cl[tmp] + "のドアが開かない";
				}
				cf.player[0] -= x;
				cf.player[1] -= y;
			break;
			case 6:
				cf.field[cf.player[1]][cf.player[0]] = 0;
				money += tmp;
				document.getElementById("money").innerText = money;
				document.getElementById("msg").innerText = tmp + "円獲得!";
			break;
			case 7:
				hp[0] -= tmp;
				if(hp[0] <= 0){
				Gameover();
				return 0;
				}
				document.getElementById("msg").innerText = "針の罠で" + tmp + "のダメージ!";
				document.getElementById("hp").innerText = hp[0] + "/" + hp[1];
			break;
		}
		break;
	}
	if(cf.player[0] == cf.goal[0] && cf.player[1] == cf.goal[1]){
		sfl++;
		fl = Math.min(fl,sfl);
		Floor_update();
		document.getElementById("playing").style.display = "none";
		document.getElementById("select").style.display = "block";
		now = "select";
		return 0;
	}
	for(var i = 0;i < cf.enemy.length;i++){
		if(cf.player[0] == cf.enemy[i][0] && cf.player[1] == cf.enemy[i][1]){
			Gameover();
			break;
		}
	}
}
function Emove(x,y){
	if(cf.enemy[elen][0] + x < cf.field[0].length && cf.enemy[elen][0] + x >= 0){
		cf.enemy[elen][0] += x;
	}else{
		move[1]++;
		eds = 0;
		return 0;
	}
	if(cf.enemy[elen][1] + y < cf.field.length && cf.enemy[elen][1] + y >= 0){
		cf.enemy[elen][1] += y;
	}else{
		move[1]++;
		eds = 0;
		return 0;
	}
	for(var i = 0;i < cf.enemy.length;i++){
		if(cf.player[0] == cf.enemy[i][0] && cf.player[1] == cf.enemy[i][1]){
			Gameover();
			break;
		}
	}
}
function Gameover(){
		ename = Math.floor(Math.random() * 2);
		hp[0] = hp[1];
		document.getElementById("playing").style.display = "none";
		music.play();
		now = "die";
}
function Cont(){
	document.getElementById("cont").style.display = "none";
	document.getElementById("select").style.display = "block";
	now = "select";
}
function Hkey(){
	var tmp = "";
	for(var i = 0;i < hkey.length;i++){
		if(hande[0]){
			tmp += "鍵";
		}else{
			tmp += hkey[i];
		}
		if(i != hkey.length - 1)tmp += ",";
	}
	return tmp;
}
function Use(){
	if(med > 0){
		med--;
		hp[0] = Math.min(hp[1],hp[0] + 5);
		document.getElementById("hp").innerText = hp[0] + "/" + hp[1];
		document.getElementById("med").innerText = med;
	}
}
function Sbutton(x){
	if(now == "pmove" && x != 4){
	switch(x){
		case 1: Pmove(0,-1); move[0]--;break;
		case 2: Pmove(0,1); move[0]--;break;
		case 3: Pmove(1,0); move[0]--;break;
		case 0: Pmove(-1,0); move[0]--;break;
	}
	document.getElementById("dice").innerText = move[0];
	document.getElementById("point").innerText = cp[0] ? "(" + cf.player[0] + "," + cf.player[1] + ")" : "?";
	if(move[0] == 0 && now != "die"){
		document.getElementById("dis").innerText = Enedis();
		now = (cf.enemy.length == 0) ? "droll" : "edwait";
		elen = 0;
	}
	}else if(now == "droll" && x == 4){
		move[0] = Math.floor(Math.random() * 6 + 1);
		now = "pmove";
		document.getElementById("dice").innerText = move[0];
	}
}
if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) document.getElementById("smart").style.display = "block";