var diff = [8,9,2,7];
var des = 
[
["何の絵か当てよう！","目標正解率: 40%"],
["上に表示される歌詞の一部をみて","下の選択肢から","その歌詞が入っている曲名を選ぼう！","目標正解率: 40%"],
["上に表示される歌詞の一部をみて","下の選択肢から","その歌詞が入っている曲名を選ぼう！","目標正解率: 90%"],
["絵しりとりを完成させよう！","目標完成率: 60%"],
];

var des_en = 
[
["Guess what the picture is! (※Answer in Japanese)","Target accuracy rate: 40%"],
["Look at some of the lyrics displayed above and ","choose the song title that contains those lyrics ","from the options below! (※Answer in Japanese)","Target accuracy rate: 40%"],
["Look at some of the lyrics displayed above and ","choose the song title that contains those lyrics ","from the options below! (※Answer in Japanese)","Target accuracy rate: 90%"],
["絵しりとりを完成させよう！","目標完成率: 60%"],
];

function Show(x) {
    var tmp = "難易度: ";
    for(var i = 0;i < 10;i++){
        if(i < diff[x]){
            tmp += "★";
        }else{
            tmp += "☆";
        }
    }
    document.getElementById("diff").innerText = tmp;
    tmp = "";
    for(var i = 0;i < des[x].length;i++){
        tmp += des[x][i] + "<br>";
    }
    document.getElementById("des").innerHTML = tmp;
}
function Show_en(x) {
    var tmp = "Difficulty: ";
    for(var i = 0;i < 10;i++){
        if(i < diff[x]){
            tmp += "★";
        }else{
            tmp += "☆";
        }
    }
    document.getElementById("diff").innerText = tmp;
    tmp = "";
    for(var i = 0;i < des_en[x].length;i++){
        tmp += des[x][i] + "<br>";
    }
    document.getElementById("des").innerHTML = tmp;
}
if (window.localStorage) {
	let tmp = 0;
	let data = localStorage.getItem('player_star');
	if(data){
		tmp = JSON.parse(data);
		document.getElementById("star").innerText = tmp;
	}
}