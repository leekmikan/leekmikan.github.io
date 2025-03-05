let ans = [
    "ネギみかん",
    "2",
    "2",
    "3",
    "NULL",
]
document.getElementById("res").style.display = "none";
function res(){
    let score = 0;
    if(document.getElementById("q1").value == ans[0]) score++;
    if(radio_ckeck(document.getElementsByName("q2")) == ans[1]) score++;
    if(radio_ckeck(document.getElementsByName("q3")) == ans[2]) score++;
    if(radio_ckeck(document.getElementsByName("q4")) == ans[3]) score++;
    if(document.getElementById("q5").value == ans[4]) score++;
    document.getElementById("score").innerText = (score * 20) + "/100";
    document.getElementById("quiz").style.display = "none";
    document.getElementById("res").style.display = "block";
}
function radio_ckeck(x){
    for(let i = 0;i < x.length;i++){
        if(x[i].checked) return x[i].value; 
    }
    return 0;
}