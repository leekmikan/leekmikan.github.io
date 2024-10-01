let ans = 0;
let cname = ["df","nm","lg","bn"];
function Cg(x){
    let nv = (ans >> (2 * x)) % 4;
    ans -= nv << (2 * x);
    nv = (nv + 1) % 4;
    document.getElementsByTagName("button")[x].classList = cname[nv];
    ans += nv << (2 * x);
    document.getElementById("answer").innerText = ("00" + ans.toString(16).toUpperCase()).substr(-2);
}
function Reset(){
    ans = 0;
    for(let i = 0;i < 4;i++){
        document.getElementsByTagName("button")[i].classList = cname[0];
    }
    document.getElementById("answer").innerText = ("00" + ans.toString(16).toUpperCase()).substr(-2);
}