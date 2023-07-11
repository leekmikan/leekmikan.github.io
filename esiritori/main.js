function check(){
	var qsd = document.getElementsByTagName("td");
	var score = [0,0];
	for(var i = 0;i < qsd.length / 2;i++){
		if(document.getElementById("ip" + i).value == ans[i]){
			document.getElementById("q" + i).className = "qz r";
			score[0]++;
		}else{
			document.getElementById("q" + i).className = "qz m";
		}
		score[1]++;
	}
	document.getElementById("score").innerText = score[0] + "/" + score[1];
}