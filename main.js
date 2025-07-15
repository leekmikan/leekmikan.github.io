let time_table;
let deps;
let subject;
let gakka;
let radio_val = "spring";
let day_value = "1";
let depnum = "1";
let gakka_value = "1";
let period_value = "1";

//時間割を表示する
function show_subs(){
    let sub = document.getElementById("科目一覧のul(またはol)タグのid");
    let not_found = true;
    sub.innerHTML = "";
    for(i of subject){
        let tmp_depnum = Number(depnum) - 1;
        let tmp_gakkanum = Number(gakka_value) - 1;
        if(i.term == radio_val && i.school == tmp_depnum && i.dep == tmp_gakkanum && i.day == Number(day_value) && i.period == Number(period_value)){ //検索条件に合うか確認
            sub.innerHTML += "<li>" + i.subject + "</li>";
            not_found = false;
        }
    }
    //見つかりませんでしたを表示するかどうか
    if(not_found){
        document.getElementById("見つかりませんでしたと書いた要素を用意し、その要素のid").style.display = "block";
    }else{
        document.getElementById("見つかりませんでしたと書いた要素を用意し、その要素のid").style.display = "none";
    }
}

//学期選択用 
async function load_subjects(){
    let resp = null;
    if(radio_val == "spring") {
        resp = await fetch("time_table/s.json");
    }else{
        resp = await fetch("time_table/f.json");
    }
    subjects = await resp.json();
    for(i of subjects){
        let obj = document.getElementById("時間割テーブルのid");
        let row = obj.getElementsByTagName("tr")[i.period];
        let cell = row.getElementsByTagName("td")[i.day];
        cell.innerHTML = i.subject + "<br>" + i.teacher + "<br>" + i.room;
    }
}

//学部選択用
async function load_deps(){
    let resp = await fetch("departments/00" + depnum +  ".json");
    gakka = await resp.json();
    let gakka_list_val = document.getElementById("学科選択用のselect要素のid");
    gakka_list_val.innerHTML = "";
    for(let i of gakka){
        let tmp = i.code + 1;
        gakka_list_val.innerHTML += "<option value=" + tmp + ">" + i.name + "</option>";
    }
}

//固定データを取得
async function load_maindatas(){
    let resp = await fetch("school_data.json");
    deps = await resp.json();
    resp = await fetch("subjects.json");
    subject = await resp.json();
    //学期選択用 とおなじ
    let gakubu_list_val = document.getElementById("学部選択用のselect要素のid");
    gakubu_list_val.innerHTML = "";
    for(let i of deps){
        let tmp = i.code + 1;
        gakubu_list_val.innerHTML += "<option value=" + tmp + ">" + i.name + "</option>";
    }
}

//ラジオボタンを操作した時に実行する
async function change_radio_value(){
    let selv = document.getElementsByName("セメスターのinput要素２つ(春秋)のname属性名")[0].checked;
    if(selv){
        radio_val = "spring";
    }else{
        radio_val = "fall";
    }
    let resp = null;
    if(radio_val == "spring") {
        resp = await fetch("time_table/s.json");
    }else{
        resp = await fetch("time_table/f.json");
    }
    subjects = await resp.json();
    for(i of subjects){
        let obj = document.getElementById("時間割テーブルのid");
        let row = obj.getElementsByTagName("tr")[i.period];
        let cell = row.getElementsByTagName("td")[i.day];
        cell.innerHTML = i.subject + "<br>" + i.teacher + "<br>" + i.room;
    }
}
document.getElementById("学部選択のselect要素のid").onchange = function(){
    depnum = this.value;
    load_deps();
}
document.getElementById("学科選択のselect要素のid").onchange = function(){
    gakka_value = this.value;
}
document.getElementById("曜日選択のselect要素のid").onchange = function(){
    day_value = this.value;
}
document.getElementById("時限選択のselect要素のid").onchange = function(){
    period_value = this.value;
}

load_maindatas();
load_subjects();
load_deps();

//検索結果の表示ボタンに  onclick="show_subs()"
//学期選択ラジオボタンの春秋のinput要素それぞれに　onclick="change_radio_value()"
//を付ける