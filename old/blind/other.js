var scos = [100,1000];
var hande = [false,false,false,false];
function Pc(x){
	for(var i = 0;i < 3;i++){
		document.getElementById("p" + i).style.display = "none";
	}
	document.getElementById("p" + x).style.display = "block";
	switch(x){
		case 1:
		document.getElementById("money2").innerText = money;
		break;
	}
}
Pc(0);
function Buy(x){
	if(money >= scos[x]){
		money -= scos[x];
		switch(x){
			case 0:
				med++;
			break;
			case 1:
				hp[1] += 10;
			break;
		}
	}else{
		alert("お金が足りない");
	}
	document.getElementById("money2").innerText = money;
}
function Hande(x){
	hande[x] = !hande[x];
	document.getElementById("hande" + x).innerText = hande[x] ? "ON" : "OFF";
	emaxm = hande[1] ? 6 : 3;
}