let qs = 1;
let hintb = false;
function hintc(){
    hintb = !hintb;
    document.getElementById("hintb").src = hintb ? "img/on.jpg" : "img/off.jpg";
    document.getElementById("hint").innerText = hintb ? ans[qs - 1][1] : "---";
}
function jd(){
    if(document.getElementById("ans").value == ans[qs - 1][0]){
        document.getElementById("ans").value = "";
        alert("正解！！");
        loadq(Math.floor(ans.length * Math.random() + 1));
    }
}
function loadq(x){
    x = Math.min(ans.length,Math.max(1,x));
    document.getElementById("ms").src = "snd/Q" + x + ".mp3";
    qs = x;
    document.getElementById("hint").innerText = hintb ? ans[qs - 1][1] : "---";
    document.getElementById("qn").value = qs;
}
document.getElementById("ql").innerText = ans.length;