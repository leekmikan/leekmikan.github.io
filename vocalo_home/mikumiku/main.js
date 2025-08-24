let engine = [
    "https://www.google.com/search?udm=2&q=",
    "https://www.bing.com/images/search?q=",
    "https://search.yahoo.co.jp/image/search?p=",
    "https://image.baidu.com/search/index?tn=baiduimage&word=",
    "https://yandex.com/images/search?from=tabbar&text=",
]
function Search(str){
    location.href = engine[Radio_Val()] + str;
}
function Radio_Val(){
    let elems = document.getElementsByName("engine");
    for(let i = 0;i < elems.length;i++){
        if(elems[i].checked){
            return i;
        }
    }
}
function Random_Search(id){
    if(id == -1) id = Math.floor(Math.random() * (document.getElementsByClassName("main").length - 1) + 1);
    id++;
    let btns = (id >= 0) ? document.getElementsByClassName("main")[id].getElementsByTagName("button") : document.getElementsByTagName("button");
    let btn = null;
    do{
        btn = btns[Math.floor(Math.random() * (btns.length - 2)) + 2];
    }while(btn.innerText == "この中でランダム表示")
    btn.onclick();
}
window.addEventListener('unload', function () {
    if (window.localStorage) {
		let tmp = JSON.stringify(Radio_Val(), undefined, 1);
		localStorage.setItem('mikumiku_radio', tmp);
	}
});
if (window.localStorage) {
	let tmp = 0;
	let data = localStorage.getItem('mikumiku_radio');
	if(data){
		tmp = JSON.parse(data);
		document.getElementsByTagName("input")[Number(tmp)].click();
	}
}