//API停止の参考ページ　https://qeynos2525.blog.jp/archives/1079380270.html
//プログラムのところを下のコードに置き換える

let cb = document.getElementsByTagName("input");
let cb_name = document.getElementsByClassName("css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-1tl8opc");
let dict = [
    "DECO*27",
    "Miku Hatsune",
    "Nico Nico Douga",
    "Niconico Chokaigi",
    "Project Sekai",
    "Vocaloid",
    "初音ミク マジカルミライ",
]
let delta = cb_name.length - cb.length;
for(let i = 0;i < cb.length;i++){
    let find = false;
    for(let j = 0; j < dict.length;j++){
        if(cb_name[i + delta].innerText == dict[j]){
            find = true;
            break;
        }
    }
    if(!find) cb[i].click();
}