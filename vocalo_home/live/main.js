function Cal(){
    let oubo = Number(document.getElementById("oubo").value);
    let tousen = Number(document.getElementById("tousen").value) / 100.0;
    let oubom = Number(document.getElementById("oubom").value);
    if(oubom > 100) oubom = 100;
    let ans = (tousen == 1) ? 1 : 1 / (1 - Math.pow(1 - tousen,1.0 / oubo));
    document.getElementById("sval").innerText = Math.floor(ans * 10000) / 10000;
    let list_html = "";
    let sum = 0;
    for(let i = oubom;i >= 0;i--){
        let tmp = nCr(oubom,i) * Math.pow(1 / ans,i) * Math.pow(1 - (1 / ans),oubom - i);
        sum += tmp;
        list_html = "<tr><td>" + i + "</td><td>" + Math.floor(tmp * 1000000) / 10000 + "</td><td>" + Math.floor(sum * 1000000) / 10000 + "</td></tr>" + list_html;
    }
    list_html = "<tr><th>当選数</th><th>確率(N公演ちょうど)[%]</th><th>確率(N公演以上)[%]</th></tr>" + list_html;
    document.getElementById("list").innerHTML = list_html;
}
function nCr(n,r){
    let tmp = 1;
    for(let i = 0;i < r;i++){
        tmp *= (n - i) / (r - i);
    }
    return tmp;
}
Cal();