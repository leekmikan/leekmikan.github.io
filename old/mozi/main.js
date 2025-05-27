var dm = new Array(0);
var mt = [5,7,10];
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.font = fs + "px serif";
ctx.fillStyle = '#FFFFFF';
ctx.strokeStyle = '#FFFFFF';
ctx.textBaseline = 'center';
ctx.textAlign = 'center';


window.addEventListener( "DOMContentLoaded" , ()=> {
	const cvs = document.getElementById("canvas");
	cvs.addEventListener("click",e=>{
		const rect = e.target.getBoundingClientRect();
		const   viewX = e.clientX - rect.left,
		viewY = e.clientY - rect.top;
		const   scaleWidth =  cvs.clientWidth / cvs.width,
		scaleHeight =  cvs.clientHeight / cvs.height;
		const   canvasX = Math.floor( viewX / scaleWidth ),
		canvasY = Math.floor( viewY / scaleHeight );
		for(var i = 0;i < amount;i++){
			var cX = (canvasX - dm[i].x) * Math.cos(-dm[i].theta) - (canvasY - dm[i].y + fs / 2) * Math.sin(-dm[i].theta);
			var cY = (canvasY - dm[i].y + fs / 2) * Math.cos(-dm[i].theta) + (canvasX - dm[i].x) * Math.sin(-dm[i].theta);
			if(!dm[i].clicked && Math.abs(cX) < fs / 2 && Math.abs(cY) < fs / 2){
				dm[i].clicked = true;
				if(i == 0){
					lup();
				}
				else{
					time -= 60;
				}
				break;
			}
		}
	});
});
setInterval(function(){
	if(playing){
		time--;
		if(time < 0){
			gov();
		}
		document.getElementById("time").innerText = "残り時間: " + Math.floor(time / 20.0) + "秒";
	}
	draw();
}, 50);
function gov(){
	if((lv == 3 && stage >= 50) || (lv == 2 && stage >= 120) || (lv == 1 && stage >= 150)){
		Get_Star(50);
	}else if((lv == 3 && stage >= 40) || (lv == 2 && stage >= 100) || (lv == 1 && stage >= 120)){
		Get_Star(30);
	}else if((lv == 3 && stage >= 25) || (lv == 2 && stage >= 70) || (lv == 1 && stage >= 100)){
		Get_Star(10);
	}
	playing = false;
	dm = new Array(0);
}
function lup(){
	stage++;
	if(stage >= 100){
		maxs += 0.05;
		maxds += 0.1;
	}else{
		amount++;
	}
	time = Math.min(time + 20 * mt[lv],2400);
	switch(stage){
		case 20:
			move = true;
			amount = 10;
		break;
		case 40:
			deg = true;
			amount = 10;
		break;
		case 60:
			dmove = true;
			amount = 10;
		break;
		case 80:
			color = true;
			amount = 10;
		break;
	}
	make();
	document.getElementById("stage").innerText = "ステージ: " + stage;
}
function make(){
	var rnd = Math.floor(Math.random() * mozi[lv].length);
	dm = new Array(amount);
	dm[0] = new tx(mozi[lv][rnd][0]);
	for(var i = 1;i < amount;i++){
		dm[i] = new tx(mozi[lv][rnd][1]);
	}
	for(var i = 0;i < amount;i++){
		if(!dmove){
			dm[i].ds = 0;
			
		}
		if(!deg){
			dm[i].theta = 0;
		}
		if(!move){
			dm[i].ms = 0;
		}
	}
}
function draw(){
	ctx.clearRect( 0, 0, canvas.width, canvas.height ) ;
	ctx.strokeRect( 0, 0, canvas.width, canvas.height );
	for(var i = dm.length - 1;i>= 0;i--){
	if(!dm[i].clicked){
			if(!color){
				ctx.fillStyle = '#FFFFFF';
			}else{
				ctx.fillStyle = "rgb(" + dm[i].rgb[0] + "," + dm[i].rgb[1] + "," + dm[i].rgb[2] + ")";
			}
			dm[i].theta += dm[i].ds;
			dm[i].x += dm[i].ms * Math.cos(dm[i].mtheta);
			dm[i].y -= dm[i].ms * Math.sin(dm[i].mtheta);
			ctx.translate(dm[i].x, dm[i].y - fs / 2);
			ctx.rotate(dm[i].theta);
			ctx.translate(-dm[i].x, -dm[i].y + fs / 2) ;	
			ctx.fillText(dm[i].txt, dm[i].x, dm[i].y);
			ctx.translate(dm[i].x, dm[i].y - fs / 2);
			ctx.rotate(-dm[i].theta);
			ctx.translate(-dm[i].x, -dm[i].y + fs / 2) ;
			if(dm[i].x < fs){
				dm[i].x = fs;
				dm[i].mtheta = Math.PI - dm[i].mtheta;
			}
			if(dm[i].x > canvas.width - fs){
				dm[i].x = canvas.width - fs;
				dm[i].mtheta = Math.PI - dm[i].mtheta;
			}
			if(dm[i].y < fs){
				dm[i].y = fs;
				dm[i].mtheta = 2 * Math.PI - dm[i].mtheta;
			}
			if(dm[i].y > canvas.height){
				dm[i].y = canvas.height;
				dm[i].mtheta = 2 * Math.PI - dm[i].mtheta;
			}
		}
	}
}
function start(){
	amount = 10;
	for(var i = 0;i < 3;i++)
	{
		if(document.getElementsByName("level")[i].checked)
		{
			lv = i;
		}
	}
	fs = 32;
	stage = 1;
	dmove = false;
	move = false;
	deg = false;
	color = false;
	maxs = 8;
	time = 1200;
	maxds = 30;
	playing = true;
	make();
}
function dummy(){ //コピー用
	dmove = false;
	move = false;
	deg = false;
	color = false;
	
	dmove = true;
	move = true;
	deg = true;
	color = true;
}
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