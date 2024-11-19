var chance = [
[999973989,218973989,9673989,32489,2409,609,109,9],
[9886761,2433761,132761,4161,161,41,34,4],
];
var cmp = [0,0,0,0,0,0,0,0];
var elem = ["窒素 N","酸素 O","アルゴン Ar","二酸化炭素 CO","ネオン Ne","ヘリウム He","クリプトン Kr","キセノン Xe"];
var elems = ["N2","O2","Ar","CO2","Ne","He","Kr","Xe"];
var schance = 0;
var left = 0;
function Open(){
	var res = 7;
	var rnd = Math.floor(Math.random() * chance[schance][0]);
	for(var i = 0; i < chance[0].length - 1;i++){
		if(rnd < chance[schance][i] && rnd >= chance[schance][i + 1]){
			res = i;
			break;
		}
	}
	cmp[res]++;
	switch(res){
		case 3: Get_Star(1); break;
		case 4: Get_Star(10); break;
		case 5: Get_Star(100); break;
		case 6: Get_Star(500); break;
		case 7: Get_Star(8192); break;
	}
    var tmp = "";
	var unl = 0;
	var sum = 0;
	for(var i = 0;i < cmp.length;i++){
		tmp += (cmp[i] != 0) ? ("[" + elems[i] + "(" + cmp[i] + ")]") : "[???]";
		unl += (cmp[i] != 0) ? 1 : 0;
		sum += cmp[i];
	}
	for(var i = 0;i < cmp.length;i++){
		document.getElementById("rd" + (i + 1)).className = (i < unl) ? "rde" : "rdd";
	}
	document.getElementById("sum").innerText = sum;
	document.getElementById("cmp").innerText = tmp;
	document.getElementById("name").innerText = elem[res];
	document.getElementById("sub").innerText = (res == 0 || res == 1 || res == 3) ? "2" : "";
	if(schance == 1) {
	left--;
	if(left <= 0) {
	schance = 0;
	}
	}
	rnd = Math.floor(Math.random() * 200);
	if(rnd == 0) {
	schance = 1;
	left = Math.max(left,30);
	}
	document.getElementById("sp").innerText = (schance == 1) ? ("確変中!!(" + left + ")"): "　";
}
function Reward(x){
	if(document.getElementById("rd" + x).className == "rde"){
		switch(x){
			case 1:
				if (window.localStorage) {
					let cmpj = JSON.stringify(cmp, undefined, 1);
					localStorage.setItem('atmosphere_capsule_toys', cmpj);
					alert("セーブしました");
				}else{
					alert("localStorageが使えません");
				}
			break;
			case 2:
				alert("ガチャ引けたね すごいすごい");
			break;
			case 3:
				document.body.style.background = "#008080";
			break;
			case 4:
				document.body.style.background = "linear-gradient(to top left, #FF40FF, #FFFFFF)";
			break;
			case 5:
			    alert("半永久確変状態にしました");
			    left = 99999999;
				schance = 1;
			break;
			case 6:
				document.body.style.background = "";
				document.body.style.backgroundImage = "URL(./img/earth.jpg)";
			break;
			case 7:
				document.body.style.background = "";
				document.body.style.backgroundImage = "URL(./img/7.jpg)";
			break;
			case 8:
				alert("えらいっ");
				alert("");
				alert("");
				alert("");
				alert("");
				alert("");
				alert("");
				alert("");
				alert("");
				alert("");
				alert("こんな け゛ーむに まし゛に なっちゃって と゛うするの");
			break;
			case 9:
				document.body.style.background = "";
				document.body.style.backgroundImage = "";
			break;
			case 10:
				if (window.localStorage) {
					var result = window.confirm('リセットする?');
					if(result){
						Reward(9);
						localStorage.removeItem('atmosphere_capsule_toys');
						cmp = [0,0,0,0,0,0,0,0];
						var tmp = "";
						var unl = 0;
						for(var i = 0;i < cmp.length;i++){
							tmp += (cmp[i]) ? ("[" + elems[i] + "]") : "[???]";
							unl += (cmp[i]) ? 1 : 0;
						}
						for(var i = 0;i < cmp.length;i++){
							document.getElementById("rd" + (i + 1)).className = (i < unl) ? "rde" : "rdd";
						}
						document.getElementById("cmp").innerText = tmp;
					}
				}
			break;
		}
	}
}
function Load(){
  document.body.addEventListener('keydown',function(){
    if(event.keyCode == 123){
      event.preventDefault();
    }
  });
	if (window.localStorage) {
		data = localStorage.getItem('atmosphere_capsule_toys');
		if(data){
			cmp = JSON.parse(data);
		}
	}
	var tmp = "";
	var unl = 0;
	var sum = 0;
	for(var i = 0;i < cmp.length;i++){
		tmp += (cmp[i] != 0) ? ("[" + elems[i] + "(" + cmp[i] + ")]") : "[???]";
		unl += (cmp[i] != 0) ? 1 : 0;
		sum += cmp[i];
	}
	for(var i = 0;i < cmp.length;i++){
		document.getElementById("rd" + (i + 1)).className = (i < unl) ? "rde" : "rdd";
	}
	document.getElementById("sum").innerText = sum;
	document.getElementById("cmp").innerText = tmp;
}
function Get_Star(x){
	if (window.localStorage) {
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
window.onload = Load;
console.log("あっ！　開発者ツールつかってる～");
console.log("ズルしない方が楽しめるのに...");