function Knuth(x){
	var rt = (x[0] == -1) ? "-" : "";
	for(var i = 2;i < x.length;i++){
		rt += "10↑<sup>";
	}
	for(var i = x.length - 1;i > 1;i--){
		rt += x[i] + "</sup>";
	}
	rt += x[1];
	return rt;
}

var a = [1,5,2,4];
document.getElementById("text").innerHTML = Knuth(a);