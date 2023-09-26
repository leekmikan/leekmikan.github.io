//x/10s
const HUSEI = 10; //不正までのカウント数
const WRONG = false; //未実装
const OUT_WIDTH_MULT = 0.87
var count = 0;
var ran = false;

let zoom_level = window.devicePixelRatio || window.screen.availWidth / document.documentElement.clientWidth;
setInterval(function(){
	if(window.outerWidth * OUT_WIDTH_MULT > window.innerWidth * zoom_level){
		count++;
	}
	if(count > HUSEI && !ran){
		Delete_Elements();
	}
}, 100);
function Delete_Elements(){
	let list_element = document.body;
	let remove_element = list_element.removeChild(list_element.firstElementChild);
	var newElement = document.createElement("p");
	var newContent = document.createTextNode("不正を検知しました。"); 
	newElement.appendChild(newContent);
	list_element.insertBefore(newElement, list_element.firstChild);
	ran = true;
}