var alp = ["n","u","b","t","q","p","h","s","o","e"];
var alp2 = ["nil","un","bi","tri","quad","pent","hex","sept","oct","enn"];
var alp2_last = ["nilium","unium","bium","trium","quadium","pentium","hexium","septium","octium","ennium"];
var alp_jp = ["ニル","ウン","ビ","トリ","クアッド","ペント","ヘキサ","セプト","オクト","エン"];
var alp_jp_last = ["ニリウム","ウニウム","ビウム","トリウム","クアッディウム","ペンティウム","ヘキシウム","セプティウム","オクティウム","エニウム"];
function ename(x){
	var rt = "";
	while(x >= 1){
		rt = alp[x % 10] + rt;
		x = Math.floor(x / 10);
	}
	return rt[0].toUpperCase() + rt.slice(1); 
}
function ename2(x){
	var rt = "";
	var first = true;
	while(x >= 1){
		rt = (first) ? alp2_last[x % 10] + rt : alp2[x % 10] + rt;
		x = Math.floor(x / 10);
		first = false;
	}
	return rt[0].toUpperCase() + rt.slice(1); 
}
function enamejp(x){
	var rt = "";
	var first = true;
	while(x >= 1){
		rt = (first) ? alp_jp_last[x % 10] + rt : alp_jp[x % 10] + rt;
		x = Math.floor(x / 10);
		first = false;
	}
	return rt[0].toUpperCase() + rt.slice(1); 
}
function show_ename(){
	var num = Number(document.getElementById("enum").value);
	if(num > 0){
		var txt = ename(num);
		var txt2 = ename2(num);
		var txt3 = enamejp(num);
		document.getElementById("ename").innerHTML = "No." + num + "<br>" + txt + "<br>" + txt2 + "<br>" + txt3;
	}
}
show_ename();