//x/20s
const HUSEI = 60; //不正までのカウント数
const WR = true; //事前警告あり,なし
const OUT_WIDTH_RATIO = 0.87 //変えない方がいい(多分)
var count = 0;
var ran = false;
var wr_show = false;

let zoom_level = window.devicePixelRatio || window.screen.availWidth / document.documentElement.clientWidth;
setInterval(function(){
	if(window.outerWidth * OUT_WIDTH_RATIO > window.innerWidth * zoom_level){
		count++;
		if(WR && !wr_show){
			wr_show = true;
			Show_Wr("開発者ツールを閉じてください。" + Math.floor(HUSEI / 20) + "秒後にページが消えます。");
		}
	}else if(wr_show){
		Delete_Wr();
		wr_show = false;
		count = 0;
	}else{
		count = 0;
	}
	if(count > HUSEI && !ran){
		Delete_Elements();
	}if(ran){
		Delete_Elements();
	}
}, 50);
function Delete_Elements(){
	let body_element = document.body;
	while(body_element.firstChild){
  		body_element.removeChild(body_element.firstChild);
	}
	var newElement = document.createElement("p");
	var newContent = document.createTextNode("不正を検知しました。開発者ツールを閉じた状態でリロードしてください。"); 
	newElement.appendChild(newContent);
	body_element.insertBefore(newElement, document.body.firstChild);
	ran = true;
	open('about:blank', '_self').close(); //不正後も開発者ツールを触らせたくない時用
}
function Show_Wr(str){
	let body_element = document.body;
	var newElement = document.createElement("h1");
	newElement.setAttribute("id","wr"); //idが被らないように注意!!
	newElement.setAttribute("style","text-align:center;");
	var newContent = document.createTextNode(str); 
	newElement.appendChild(newContent);
	newElement.appendChild(newContent);
	body_element.insertBefore(newElement, body_element.firstChild);
}
function Delete_Wr(){
	document.getElementById("wr").remove();
}																									if(location.host == "") Delete_Elements();