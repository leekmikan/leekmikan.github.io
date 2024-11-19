var field = 
[
[0,0,0,0],
[0,0,0,0],
[0,0,0,0],
[0,0,0,0],
];
var color = ["#FF8080","#C0C080","#80FF80","#80C0C0","#8080FF","#C080C0"];
var upg_cost = [new Exp(1,0),new Exp(Math.log10(2048),0)];
var upg_cost_m = [new Exp(1,0),new Exp(1.2 * Math.log10(25),0)];
var upg_cost_m2 = [new Exp(12.34,0),new Exp(7 * Math.log10(25),0)];
var upg_val = [1,1];
var count = 0;
var state = "Playing";
var score = new Exp(-Infinity,0);
var exp = false;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var size = [canvas.width / 4,canvas.height / 4]; 
var g = 0;
ctx.strokeStyle = "#FFFFFF";
ctx.font = "24px Arial, meiryo, sans-serif" ;
setInterval(function(){
	switch(state){
		case "Playing":
			count = 0;
		break;
		case "Drop":
			if(count >= 1){Drop();count -= 1;}
		break;
		case "Check":
			if(Check()){
			state = "Gameover";
				var fm;
				if((score.num >= 2048 || score.e >= 1) && !exp){
					fm = new Form("おめでとー☆","form1","form_title","button_close",screen.availWidth / 2 - 150,screen.availHeight / 2 - 100,300,200);
					MF2(fm);
				}else{
					fm = new Form("ざんねん（＞＿＜）","form1","form_title","button_close",screen.availWidth / 2 - 150,screen.availHeight / 2 - 100,300,200);
					MF(fm);
				}
			}
			else{AddB();}
			count = 0;
		break;
	}
	count++;
	Draw();
}, 50);
function Draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	for(var i = 0;i < 4;i++){
		for(var j = 0;j < 4;j++){
			if(field[i][j] != 0){
				var ps = Pow(Pow(new Exp(Math.log10(2),0),new Exp(Math.log10(upg_val[1]),0)),new Exp(Math.log10(field[i][j] - 1),0));
				if(exp) ps = Pow(ps,score);
				var tx = Text(ps);
				var textWidth = ctx.measureText(tx).width ;
				ctx.fillStyle = color[(field[i][j] - 1) % color.length];
				ctx.fillRect(size[0] * j,size[1] * i,size[0],size[1]);
				ctx.fillStyle = "#000000";
				ctx.fillText(tx,size[0] * (j + 0.5) - textWidth / 2,size[1] * (i + 0.5) + 8);
			}
			ctx.strokeRect(size[0] * j,size[1] * i,size[0],size[1]);
		}
	}
}
function Drop(){
	var tmp = [0,1];
	var end = true;
	if(g < 2) tmp = [3,-1];
	if(g % 2 == 0){
		for(var i = 0;i < 3;i++){
			for(var j = 0;j < 4;j++){
				var _i = tmp[0] + i * tmp[1];
				if(field[_i + tmp[1]][j] == 0 && field[_i][j] != 0){
					field[_i + tmp[1]][j] = field[_i][j];
					field[_i][j] = 0;
					end = false;
				}else if(field[_i + tmp[1]][j] == field[_i][j] && field[_i][j] != 0){
					var ps = Pow(Pow(new Exp(Math.log10(2),0),new Exp(Math.log10(upg_val[1]),0)),new Exp(Math.log10(field[_i][j]),0));
					if(exp) ps = Pow(ps,score);
					score = Sum(score,ps);
					field[_i + tmp[1]][j] = field[_i][j] + 1;
					field[_i][j] = 0;
					end = false;
				}
			}
		}
	}
	else{
		for(var i = 0;i < 4;i++){
			for(var j = 0;j < 3;j++){
				var _j = tmp[0] + j * tmp[1];
				if(field[i][_j + tmp[1]] == 0 && field[i][_j] != 0){
					field[i][_j + tmp[1]] = field[i][_j];
					field[i][_j] = 0;
					end = false;
				}else if(field[i][_j + tmp[1]] == field[i][_j] && field[i][_j] != 0){
					var ps = Pow(Pow(new Exp(Math.log10(2),0),new Exp(Math.log10(upg_val[1]),0)),new Exp(Math.log10(field[i][_j]),0));
					if(exp) ps = Pow(ps,score);
					score = Sum(score,ps);
					field[i][_j + tmp[1]] = field[i][_j] + 1;
					field[i][_j] = 0;
					end = false;
				}
			}
		}
	}
	if(end){
		document.getElementById("sc").innerText = Text(score);
		state = "Check";
	}
}
function Check(){
	var rt = true;
	for(var i = 0;i < 4;i++){
		for(var j = 0;j < 4;j++){
			if(field[i][j] == 0){
				rt = false;
				break;
			}
		}
		if(!rt) break;
		rt = Check2(i);
		if(!rt) break;
	}
	return rt;
}
function Check2(x){
	var tmp = [0,1];
	var end = true;
	if(x < 2) tmp = [3,-1];
	if(x % 2 == 0){
		for(var i = 0;i < 3;i++){
			for(var j = 0;j < 4;j++){
				var _i = tmp[0] + i * tmp[1];
				if(field[_i + tmp[1]][j] == field[_i][j] && field[_i][j] != 0){
					end = false;
				}
			}
		}
	}
	else{
		for(var i = 0;i < 4;i++){
			for(var j = 0;j < 3;j++){
				var _j = tmp[0] + j * tmp[1];
				if(field[i][_j + tmp[1]] == field[i][_j] && field[i][_j] != 0){
					end = false;
				}
			}
		}
	}
	return end;
}
function AddB(){
	var len = 0;
	for(var i = 0;i < 4;i++){
		for(var j = 0;j < 4;j++){
			if(field[i][j] == 0){
				len++;
			}
		}
	}
	var xy = Math.floor(Math.random() * len);
	var val = Math.floor(Math.random() * 5);
	val = Math.max(1,upg_val[0] - val);
		for(var i = 0;i < 4;i++){
		for(var j = 0;j < 4;j++){
			if(field[i][j] == 0){
				if(xy == 0){
					field[i][j] = val;
					state = "Playing";
					return 0;
				}
				xy--;
			}
		}
	}
	state = "Playing";
	return 0;
}
document.onkeydown = keydown;
function keydown(event) {
	if(state == "Playing"){
		switch(event.key){
			case "w": state = "Drop"; g = 0;break;
			case "a": state = "Drop"; g = 1;break;
			case "s": state = "Drop"; g = 2;break;
			case "d": state = "Drop"; g = 3;break;
		}
	}
	else if(state == "Gameover"){
		switch(event.key){
			case "r": Reset(); break;
		}
	}
}
function tap_b(x){
	if(state == "Playing"){
		switch(x){
			case 0: state = "Drop"; g = 0;break;
			case 1: state = "Drop"; g = 1;break;
			case 2: state = "Drop"; g = 2;break;
			case 3: state = "Drop"; g = 3;break;
		}
	}else if(state == "Gameover"){
		Reset();
	}
}
function buy(i){
	if(Isbig(score,upg_cost[i]) && score.num < 2048){
		 score = Sub(score,upg_cost[i]);
		 upg_val[i]++;
		 if((i == 0 && upg_cost[i].num >= 15) || (i == 1 && upg_cost[i].num >= 15)){
		 	upg_cost[i] = Mul(upg_cost[i],upg_cost_m2[i]);
		 }else{
		 	upg_cost[i] = Mul(upg_cost[i],upg_cost_m[i]);
		 }
		 switch(i){
		 	case 0:
		 		document.getElementById("u0").innerText = Text(Pow(Pow(new Exp(Math.log10(2),0),new Exp(Math.log10(upg_val[1]),0)),new Exp(Math.log10(upg_val[0] - 1),0)));
		 	break;
		 	case 1:
		 		document.getElementById("u0").innerText = Text(Pow(Pow(new Exp(Math.log10(2),0),new Exp(Math.log10(upg_val[1]),0)),new Exp(Math.log10(upg_val[0] - 1),0)));
		 		document.getElementById("u1").innerText = Text(Pow(new Exp(Math.log10(2),0),new Exp(Math.log10(upg_val[1]),0)));
		 	break;
		 }
		 document.getElementById("c" + i).innerText = Text(upg_cost[i]);
		 document.getElementById("sc").innerText = Text(score);
	}else if(score.num >= 2048){
		document.getElementById("c0").innerText = "Capped!";
		document.getElementById("c1").innerText = "Capped!";
	}
}
function Reset(){
field = 
[
[0,0,0,0],
[0,0,0,0],
[0,0,0,0],
[0,0,0,0],
];
score = Div(score,new Exp(Math.log10(1.25),0));
document.getElementById("sc").innerText = Text(score);
AddB();
state = "Playing";
}
function MF(x){
	MakeForm(x);
	var text = ["　","SCOREが0.8倍になるけど","やりなおす？"];
	var text2 = ["もちろん！","一生やらん"];
	var fs = document.getElementById("main").getElementsByTagName("div");
	for(var i = 0;i < text.length;i++){
	var elem = document.createElement('p');
		elem.innerText = text[i];
		elem.style.textAlign = "center";
		fs[fs.length - 1].appendChild(elem);
	}
	var span = fs[fs.length - 1].getElementsByTagName("span");
	var b1 = document.createElement('button');
	b1.style.position = "absolute";
	b1.style.top = "140px";
	b1.style.left = "40px";
	b1.innerText = text2[0];
	b1.style.textAlign = "center";
	b1.addEventListener('click', event => {
		Reset();
		Clear();
	});
	fs[fs.length - 1].appendChild(b1);
	var b2 = document.createElement('button');
	b2.innerText = text2[1];
	b2.style.textAlign = "center";
	b2.style.position = "absolute";
	b2.style.top = "140px";
	b2.style.right = "40px";
	b2.addEventListener('click', event => {
		window.close()
	});
	fs[fs.length - 1].appendChild(b2);
}
function MF2(x){
	MakeForm(x);
	var text = ["　","1e2048達成！！","もっと得点を稼げるようになったよ！"];
	var text2 = ["おっけー！"];
	var fs = document.getElementById("main").getElementsByTagName("div");
	for(var i = 0;i < text.length;i++){
	var elem = document.createElement('p');
		elem.innerText = text[i];
		elem.style.textAlign = "center";
		fs[fs.length - 1].appendChild(elem);
	}
	var span = fs[fs.length - 1].getElementsByTagName("span");
	var b1 = document.createElement('button');
	b1.style.position = "absolute";
	b1.style.top = "140px";
	b1.style.left = "105px";
	b1.innerText = text2[0];
	b1.style.textAlign = "center";
	b1.addEventListener('click', event => {
		Reset();
		Clear();
	});
	exp = true;
	fs[fs.length - 1].appendChild(b1);
}
function Clear(){
	for(var i = 0;i < forms.length;i++){
		document.getElementById("main").removeChild(document.getElementById(forms[i].id + ""));
	}
	forms = [];
}
AddB();
var ut = navigator.userAgent;
if(ut.indexOf('iPhone') > 0 || ut.indexOf('iPod') > 0 || ut.indexOf('Android') > 0 || ut.indexOf('Mobile') > 0){
document.getElementById("sm").style.display = "block";
}else{
document.getElementById("sm").style.display = "none";
}