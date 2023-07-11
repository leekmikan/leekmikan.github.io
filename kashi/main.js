var rand = [0,0,0];
var rang = [0,1,2,3,4,5];
var debug = false;
var dnum = [3,28];
var prg = [
[0,0],
[0,0],
[0,0],
[0,0],
[0,0],
[0,0],
];
var sum = 0;
var cm = [
[0,0],
[0,0],
[0,0],
[0,0],
[0,0],
[0,0],
[0,0],
[0,0],
[0,0],
[0,0],
];
function Update(x){
var tmp = [0,0];
if(x == 1){
var gx = 0;
for(var i = 0;i < 10;i++){
	prg[cm[i][1]][0] += cm[i][0];
	prg[cm[i][1]][1]++;
	gx += cm[i][0];
}
	if(gx >= 5){
		Get_Star((gx - 4) * 3);
	}
}
for(var i = 0;i < 6;i++){
	tmp[0] += prg[i][0];
	tmp[1] += prg[i][1];
	if(prg[i][1] == 0) {
		document.getElementById("g" + i).innerHTML = "0/0<br>(--%)";
	}else{
		document.getElementById("g" + i).innerHTML = prg[i][0] + "/" + prg[i][1] + "<br>(" + Math.round(100 * prg[i][0] / prg[i][1])+ "%)";
	}
}
	if(tmp[1] == 0) {
		document.getElementById("ga").innerHTML = "0/0<br>(--%)";
	}else{
		document.getElementById("ga").innerHTML = tmp[0] + "/" + tmp[1] + "<br>(" + Math.round(100 * tmp[0] / tmp[1])+ "%)";
	}
	Save();
}
function Ans(x){
	if(x == rand[1]){
		cm[sum % 10][0] = 1;
	}else{
		cm[sum % 10][0] = 0;
	}
	cm[sum % 10][1] = rand[2];
	if(sum % 10 == 9){
		Update(1);
	}
	sum++;
	document.getElementById("lf").innerHTML = 10 - (sum % 10);
	Change();
}
function Change(){
	rand[2] = rang[Math.floor(Math.random() * rang.length)];
	rand[0] = Math.floor(Math.random() * qs[rand[2]].length);
	rand[1] = Math.floor(Math.random() * 8);
	var sel = new Array(8);
	for(var i = 0;i < 8;i++){
		sel[i] = new Array(2);
		sel[i][0] = -1;
		sel[i][1] = -1;
	}
	if(debug){
		rand[2] = dnum[0];
		rand[0] = dnum[1];
	}
	sel[rand[1]][0] = rand[2];
	sel[rand[1]][1] = rand[0];
	var tmp = [0,0];
	var i = 0;
	while(i < 8){
		if(i == rand[1]){
			document.getElementById("b" + i).innerHTML = qs[rand[2]][rand[0]][1];
			i++;
		}
		else{
		tmp[0] = rang[Math.floor(Math.random() * rang.length)];
		tmp[1] = Math.floor(Math.random() * qs[tmp[0]].length);
		for(var j = 0;j < 8;j++){
			if(tmp[0] == sel[j][0] && tmp[1] == sel[j][1]){
				break;
			}
			if(j == 7){
				sel[i][0] = tmp[0];
				sel[i][1] = tmp[1];
				document.getElementById("b" + i).innerHTML = qs[sel[i][0]][sel[i][1]][1];
				i++;
			}
		}
		}
	}
	document.getElementById("qs").innerHTML = qs[rand[2]][rand[0]][0];
}
function Save(){
	if (window.localStorage) {
		let jprg_hard = JSON.stringify(prg, undefined, 1);
		localStorage.setItem('jprg_hard', jprg_hard);
	}
}
function Load(){
  document.body.addEventListener('keydown',function(){
    if(event.keyCode == 123){
      event.preventDefault();
    }
  });
	if (window.localStorage) {
		let data = localStorage.getItem('jprg_hard');
		if(data){
			prg = JSON.parse(data);
			Update(0);
		}
		data = localStorage.getItem('jrang_hard');
		if(data){
			rang = JSON.parse(data);
			for(i = 0;i < 6;i++){
				document.getElementById("Cb" + i).checked = false;
			}
			for(i = 0;i < rang.length;i++){
				document.getElementById("Cb" + rang[i]).checked = true;
			}
		}
	}
	Cbox();
}
function Reset(){
	if (window.localStorage) {
		var result = window.confirm('リセットする?');
		if(result){
			localStorage.removeItem('jprg_hard');
			prg = [
			[0,0],
			[0,0],
			[0,0],
			[0,0],
			[0,0],
			[0,0],
			];
			sum = 0;
			Update(0);
			document.getElementById("lf").innerHTML = 10 - (sum % 10);
		}
	}
}
function Cbox(){
	rang = [];
	for(i = 0;i < 6;i++){
		if(document.getElementById("Cb" + i).checked){
			rang.push(i);
		}
	}
	if(rang.length == 0){
		rang.push(0);
		document.getElementById("Cb0").checked = true;
	}
	Change();
}
function mes(event){
		let jrang_hard = JSON.stringify(rang, undefined, 1);
		localStorage.setItem('jrang_hard', jrang_hard);
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
window.onbeforeunload = mes;
window.onload = Load;
