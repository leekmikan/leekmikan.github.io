let speed = [1,1.5,1,1.5,1.5];
let stat = "sel";
let diff = 0;
let com_speed = [[18,28],[9,12],[4,7],[1,3],[0.2,0.3]];
let time = 0;
let com_time = [0,0];
let now_txt = [0,0];
let sel_tanka = 0;
let max_len = 0;
let cards = new Array(30);
let snd = [new Audio("snd/crrect_answer2.mp3"),new Audio("snd/blip01.mp3")];
let otetsuki = 0;
let score = [0,0];
function set_cards(x){
	let tmp_cards = new Array(tanka.length);
	for(let i = 0;i < tanka.length;i++){
		tmp_cards[i] = i;
	}
	for(let i = 0;i < x;i++){
		let x = rnd_next(0,tanka.length - 1);
		let y = rnd_next(0,tanka.length - 1);
		let tmp = tmp_cards[x];
		tmp_cards[x] = tmp_cards[y];
		tmp_cards[y] = tmp;
	}
	let ihtml = "";
	let rowi = 0;
	for(let i = 0;i < cards.length;i++){
		if(rowi == 0) ihtml += "<tr>";
		rowi++;
		ihtml += '<td><img id="p' + i +'" onclick="touch(' + i + ');" src="../img/1.jpg"></td>';
		if(rowi == 10){
			rowi = 0;
			ihtml += "</tr>";
		}
	}
	document.getElementById("field").innerHTML = ihtml;
	for(let i = 0;i < cards.length;i++){
		document.getElementById("p" + i).src = "../img/" + (tmp_cards[i] + 1) + ".jpg";
		document.getElementById("p" + i).className = "";
		cards[i] = tmp_cards[i];
	}
}
function sel(x){
    diff = x;
    document.getElementById("sel_d").style.display = "none";
    document.getElementById("main").style.display = "block";
    com_time[0] = 0;
    com_time[1] = rnd_next_double(com_speed[diff][0],com_speed[diff][1])* 1000;
    set_cards(1000);
    rnd();
    now_txt = [0,0];
    draw();
    time = 0;
    score = [0,0];
    document.getElementById("score").innerText = score[0] + "-" + score[1];
    stat = "play";
}
setInterval(function(){
    if(otetsuki > 0) otetsuki -= 100;
    if(otetsuki <= 0) document.getElementById("otetsuki").style.display = "none";
    switch (stat){
	case "play":
		time -= 100;
		add_com_time();
		if(time < 0){
			now_txt[1]++;
			if(now_txt[1] > tanka[cards[sel_tanka]][now_txt[0]].length){
				now_txt[0]++;
				if(now_txt[0] >= tanka[cards[sel_tanka]].length){
					stat = "read_end";
					break;
				}else{
					now_txt[1] = 0;
					time += 1000;
				}
			}
			time += speed[now_txt[0]] / tanka[cards[sel_tanka]].length * 1000;
			draw();
		}
	break;
	case "read_end":
		add_com_time();
	break;
	case "next":
		otetsuki = 0;
		time -= 100;
		if(time < 0){
			stat = "play";
			now_txt = [0,0];
			rnd();
			com_time[0] = 0;
    			com_time[1] = rnd_next_double(com_speed[diff][0],com_speed[diff][1]) * 1000;
		}
	break;
    }
}, 100);
function rnd_next(x,y){
	return Math.floor(Math.random() * (y - x + 1)) + x;
}
function rnd_next_double(x,y){
	return Math.random() * (y - x) + x;
}
function add_com_time(){
	com_time[0] += 100;
	if(com_time[0] >= com_time[1]){
		stat = "next";
		document.getElementById("p" + sel_tanka).src = "../img/null.png";
		document.getElementById("p" + sel_tanka).className = "nl";
		score[1]++;
		now_txt = [5,0];
		draw();
		document.getElementById("score").innerText = score[0] + "-" + score[1];
		time = 3000;
		cards[sel_tanka] = -1;
		snd[0].currentTime = 0;
    		snd[0].play();
		if(score[1] >= 10){
			lose();
		}
	}
}
function rnd(){
	max_len = 0;
	sel_tanka = rnd_next(0,cards.length - 1);
	while(cards[sel_tanka] == -1){
		sel_tanka = rnd_next(0,cards.length - 1);
	}
	for(let i = 0;i < tanka[cards[sel_tanka]].length;i++){
		max_len = (max_len < tanka[cards[sel_tanka]][i].length) ? tanka[cards[sel_tanka]][i].length : max_len;
	}
}
function draw(){
	let tmp = "";
	for(let i = 0;i < now_txt[0];i++){
		tmp += tanka[cards[sel_tanka]][i];
		for(let j = tanka[cards[sel_tanka]][i].length;j < max_len;j++){
			tmp += "　";
		}
		tmp += "<br>";
	}
	for(let i = 0;i < now_txt[1];i++){
		tmp += tanka[cards[sel_tanka]][now_txt[0]][i];
	}
	if(now_txt[1] != 0){
		for(let j = now_txt[1];j < max_len;j++){
			tmp += "　";
		}
	}
	document.getElementById("txt").innerHTML = tmp;
}
function touch(x){
	if(otetsuki <= 0 && (stat == "play" || stat == "read_end") && cards[x] != -1){
		if(cards[sel_tanka] == cards[x]){
			stat = "next";
			document.getElementById("p" + sel_tanka).src = "../img/null.png";
			document.getElementById("p" + sel_tanka).className = "nl";
			score[0]++;
			now_txt = [5,0];
			draw();
			document.getElementById("score").innerText = score[0] + "-" + score[1];
			time = 3000;
			cards[x] = -1;
			snd[0].currentTime = 0;
    			snd[0].play();
			if(score[0] >= 10){
				win();
			}
		}
		else{
			snd[1].currentTime = 0;
    			snd[1].play();
			otetsuki = 3000;
			document.getElementById("otetsuki").style.display = "block";
		}
	}
}
function win(){
	stat = "end";
	alert("勝ち！！");
	document.getElementById("sel_d").style.display = "block";
	document.getElementById("main").style.display = "none";
}
function lose(){
	stat = "end";
	alert("負け...");
	document.getElementById("sel_d").style.display = "block";
	document.getElementById("main").style.display = "none";
}