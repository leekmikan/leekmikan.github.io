var player = {
    money: new Exp(0,0),
    mult:
    [
        {
        amount: new Exp(0,0),
        mult: 2,
        time: [300,300]
        }
    ],
    tw: 0,
}
var num_wiki = [
    new Exp(Math.log10(9.46) + 15,0),
    new Exp(Math.log10(6.022) + 24,0),
    new Exp(Math.log10(1.416) + 32,0),
    new Exp(Math.log10(2) * 128,0),
    new Exp(Math.log10(2) * 256 + Math.log10(136),0),
    new Exp(Math.log10(1.6) + 81,0),
    new Exp(1500,0),
    new Exp(122,2),
    Ud(new Exp(1.1,4)),
]
const M_MIN = 1;
const T_MIN = 1;
const BAI_MAX = 10;
const BAI_MIN = 1;
const KURI_G = new Exp(Math.log10(50),0);
const KURI_V = new Exp(Math.log10(0.06),0);
var letter_typeg = 1;
function Pdt(){
    for(var i = player.mult.length - 1;i >= 0;i--){
        player.mult[i].time[0]--;
        if(player.mult[i].time[0] <= 0){
            var mexp = new Exp(Math.log10(player.mult[i].mult),0);
            if(i == 0){
                player.money = Tow(Mul(player.money,Pow(mexp,player.mult[i].amount)),player.tw);
                document.getElementById("money").innerHTML = Text(player.money);
                document.getElementById("gram").innerHTML = (letter_typeg == 1) ? Textg(Mul(KURI_G,player.money)) : Text(Mul(KURI_G,player.money)) + "グラム";
                document.getElementsByTagName("tr")[1].getElementsByTagName("td")[0].innerHTML = Text(player.money);
                var v = Mul(KURI_V,player.money);
                var r = Sqr(Div(v,new Exp(Math.log10(4 * Math.PI / 3),0)),new Exp(Math.log10(3),0));
                var s = Mul(Pow(r,new Exp(Math.log10(2),0)),new Exp(Math.log10(4 * Math.PI),0));
                document.getElementById("v").innerHTML = Text(v);
                document.getElementById("s").innerHTML = Text(s);
                document.getElementById("r").innerHTML = Text(r);
            }else{
                player.mult[i - 1].amount = Tow(Mul(player.mult[i - 1].amount,Pow(mexp,player.mult[i].amount)),player.tw);
                document.getElementsByTagName("tr")[1].getElementsByTagName("td")[2 * i].innerHTML = Text(player.mult[i - 1].amount);
            }
            player.mult[i].time[0] = player.mult[i].time[1];
        }
        document.getElementsByTagName("tr")[3].getElementsByTagName("td")[2 * (i + 1)].getElementsByTagName("span")[0].innerHTML = "　" + player.mult[i].time[0] + "/" + player.mult[i].time[1] + "　";
    }
}
function Mchange(ind,pn){
    player.mult[ind].mult = Math.max(M_MIN,player.mult[ind].mult + pn);
    document.getElementsByTagName("tr")[2].getElementsByTagName("td")[2 * (ind + 1)].getElementsByTagName("span")[0].innerHTML = "　　×" + player.mult[ind].mult + "　　";
}
function Tchange(ind,pn){
    player.mult[ind].time[1] = Math.max(T_MIN,player.mult[ind].time[1] + pn);
    player.mult[ind].time[0] = Math.min(player.mult[ind].time[0],player.mult[ind].time[1]);
    document.getElementsByTagName("tr")[3].getElementsByTagName("td")[2 * (ind + 1)].getElementsByTagName("span")[0].innerHTML = "　" + player.mult[ind].time[0] + "/" + player.mult[ind].time[1] + "　";
}
var count = 0;
setInterval(function(){
    Pdt();
    count++;
    if(count >= 30){
        count = 0;
        Save();
    }
}, 1000);
window.addEventListener('beforeunload', (event) => {
	Save();
});
if (window.localStorage) {
	let data = localStorage.getItem('kuri_mult');
	if(data){
		player = JSON.parse(data);
	}
    if(player.tw === undefined) player.tw = 0;
}
function Wipe(){
    player = {
        money: new Exp(0,0),
        mult:
        [
            {
            amount: new Exp(0,0),
            mult: 2,
            time: [300,300]
            }
        ],
        tw: 0,
    }
    document.location.reload();
}
function Update(){
    for(var i = player.mult.length - 1;i >= 0;i--){
        if(i == 0){
            document.getElementById("money").innerHTML = Text(player.money);
            document.getElementById("gram").innerHTML = (letter_typeg == 1) ? Textg(Mul(KURI_G,player.money)) : Text(Mul(KURI_G,player.money)) + "グラム";
            document.getElementsByTagName("tr")[1].getElementsByTagName("td")[0].innerHTML = Text(player.money);
            var v = Mul(KURI_V,player.money);
            var r = Sqr(Div(v,new Exp(Math.log10(4 * Math.PI / 3),0)),new Exp(Math.log10(3),0));
            var s = Mul(Pow(r,new Exp(Math.log10(2),0)),new Exp(Math.log10(4 * Math.PI),0));
            document.getElementById("v").innerHTML = Text(v);
            document.getElementById("s").innerHTML = Text(s);
            document.getElementById("r").innerHTML = Text(r);
        }
        Mchange(i,0);
        Tchange(i,0);
        document.getElementsByTagName("tr")[1].getElementsByTagName("td")[2 * (i + 1)].innerHTML = Text(player.mult[i].amount);
    }
    for(var i = 0;i < num_wiki.length;i++){
        document.getElementById("num").getElementsByTagName("span")[i].innerHTML = Text(num_wiki[i]);
    }
    document.getElementById('twv').innerText = player.tw.toFixed(4);
}
function Add_baibain(ig){
    if(ig === null) ig = -1;
    if(player.mult.length < BAI_MAX || ig >= 0){
        if(!ig){
            player.mult.push({
                amount: new Exp(0,0),
                mult: 2,
                time: [300,300]
            });
            ig = player.mult.length - 1;
        }
        document.getElementsByTagName("tr")[0].innerHTML += "<td>←</td><td><img src='img/bai.jpg'></td>";
        document.getElementsByTagName("tr")[1].innerHTML += "<td></td><td>" + Text(player.mult[ig].amount) + "</td>";
        document.getElementsByTagName("tr")[2].innerHTML += "<td></td><td><button class='r' onclick='Mchange("+ ig +",-1)'>-1x</button><span>　　×" + player.mult[ig].mult +"　　</span><button class='g' onclick='Mchange("+ ig +",1)'>+1x</button></td>";
        document.getElementsByTagName("tr")[3].innerHTML += "<td></td><td><button class='r' onclick='Tchange("+ ig +",-1)'>-1s</button><span>　" + player.mult[ig].time[0] + "/" + player.mult[ig].time[1] + "　</span><button class='g' onclick='Tchange("+ ig +",1)'>+1s</button></td>";
    }
}
function Remove_baibain(){
    if(player.mult.length > BAI_MIN){
        player.mult.pop();
        var len = document.getElementsByTagName("tr")[0].getElementsByTagName("td").length;
        for(var i = 0;i < 4;i++){
            document.getElementsByTagName("tr")[i].getElementsByTagName("td")[len - 1].remove();
            document.getElementsByTagName("tr")[i].getElementsByTagName("td")[len - 2].remove();
        }
    }
}
function Save(){
    if (window.localStorage) {
		let tmp = JSON.stringify(player, undefined, 1);
		localStorage.setItem('kuri_mult', tmp);
	}
}
function Twchange(x){
    player.tw = Math.max(player.tw + x,0);
    document.getElementById('twv').innerText = player.tw.toFixed(4)
}
for(var i = 1;i < player.mult.length;i++){
    Add_baibain(i);
}
Update();