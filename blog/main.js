const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = "#FFFFFF";
var len = 24;
var hei = 0;
var end = false;
var fname = ["　","a","b","c","d","e","f","g","h","i","j","k",
"l","m","n","o","p","q","r","s","t","u","v",
"w","x","y","z","0","1","2","3","4","5","6","7","8","9","√",
"!","#","$","%","&","'","(",")","-","=","^","~","pipe","@","`","[","{",";",
"+","coron","asta","]","}",",","small",".","big","sra","que","_","yen","°",
"α","β","γ","δ","ε","ζ","η","θ","ι","κ","λ","μ","ν","ξ","ο","π",
"ρ","σ","τ","υ","φ","χ","ψ","ω"];
var img = new Array(fname.length);
for(var i = 0;i < img.length;i++){
	img[i] = new Image();
	img[i].src = "img/" + fname[i] + ".png";
}
setInterval(function(){
if(end) Draw();
}, 100);
function load(){
	end = true;
}
function keydown(event) {
	
}
window.onkeydown = keydown;
window.onload = load;
function Draw(){
	var wh = canvas.width / len;
	var k = 0;
	ctx.fillRect(0,0,canvas.width,canvas.height);
	for(var j = 0;j < text.length;j++){
	for(var i = 0;i < text[j].length;i++){
		var ir = [j + k + Math.floor(i / len),i % len];
		if(wh * ir[0] + hei >= -wh && wh * ir[0] + hei <= canvas.height){
			var tmp = text[j][i];
			switch(tmp){
				case ">": tmp = "big"; break;
				case ":": tmp = "coron"; break;
				case "<": tmp = "small"; break;
				case "|": tmp = "pipe"; break;
				case "/": tmp = "sra"; break;
				case "￥": tmp = "yen"; break;
				case "*" : tmp = "asta"; break;
				case "?" : tmp = "que"; break;
			}
			ctx.drawImage(Sh(tmp), ir[1] * wh,ir[0] * wh + hei,wh,wh);
		}
		if(i == text[j].length - 1) k += Math.floor((text[j].length - 1) / len);
	}
	}
}
function Sh(x){
	for(var i = 0;i < fname.length;i++){
		if(fname[i] == x){
			return img[i];
		}
	}
	return img[0];
}
window.addEventListener("keydown", event => {
  if (event.keyCode == 38) {
    hei = (hei + 5 > 0) ? 0 : hei + 5;
  }else if(event.keyCode == 40){
    hei = (hei - 5 < -text.length * canvas.width / len) ? -text.length * canvas.width / len : hei - 5;
  }
});