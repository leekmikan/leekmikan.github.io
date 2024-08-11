var alp = ["n","u","b","t","q","p","h","s","o","e"];
var alp2 = ["nil","un","bi","tri","quad","pent","hex","sept","oct","enn"];
var alp2_last = ["nilium","unium","bium","trium","quadium","pentium","hexium","septium","octium","ennium"];
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
function show_ename(){
	var num = Number(document.getElementById("enum").value);
	var txt = ename(num);
	var txt2 = ename2(num);
	document.getElementById("ename").innerText = num + "：" + txt + "　(" + txt2 + ")";
}
show_ename();