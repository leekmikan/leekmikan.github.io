var player = {
    money: new Exp(0,0),
    mult:
    [
        {
        amount: new Exp(0,0),
        mult: 2,
        time: [300,300]
        }
    ]
}
const M_MIN = 1;
const T_MIN = 1;
const KURI = new Exp(Math.log10(50),0);

function Pdt(){
    for(var i = player.mult.length - 1;i >= 0;i--){
        player.mult[i].time[0]--;
        if(player.mult[i].time[0] <= 0){
            var mexp = new Exp(Math.log10(player.mult[i].mult),0);
            if(i == 0){
                player.money = Mul(player.money,Pow(mexp,player.mult[i].amount));
                document.getElementById("money").innerHTML = Text(player.money);
                document.getElementById("gram").innerHTML = Textg(Mul(KURI,player.money));
                document.getElementsByTagName("tr")[1].getElementsByTagName("td")[2 * i].innerHTML = Text(player.money);
            }else{
                player.mult[i - 1].amount = Mul(player.mult[i - 1].amount,Pow(mexp,player.mult[i].amount));
                document.getElementsByTagName("tr")[1].getElementsByTagName("td")[2 * i].innerHTML = Text(player.mult[i - 1].amount);
            }
            player.mult[i].time[0] = player.mult[i].time[1];
        }
        document.getElementsByTagName("tr")[3].getElementsByTagName("span")[i].innerHTML = "　" + player.mult[i].time[0] + "/" + player.mult[i].time[1] + "　";
    }
}
function Mchange(ind,pn){
    player.mult[ind].mult = Math.max(M_MIN,player.mult[ind].mult + pn);
    document.getElementsByTagName("tr")[2].getElementsByTagName("span")[ind].innerHTML = "　　×" + player.mult[ind].mult + "　　";
}
function Tchange(ind,pn){
    player.mult[ind].time[1] = Math.max(T_MIN,player.mult[ind].time[1] + pn);
    player.mult[ind].time[0] = Math.min(player.mult[ind].time[0],player.mult[ind].time[1]);
    document.getElementsByTagName("tr")[3].getElementsByTagName("span")[ind].innerHTML = "　" + player.mult[ind].time[0] + "/" + player.mult[ind].time[1] + "　";
}
var count = 0;
setInterval(function(){
    Pdt();
    count++;
    if(count >= 30){
        count = 0;
        if (window.localStorage) {
            let tmp = JSON.stringify(player, undefined, 1);
            localStorage.setItem('kuri_mult', tmp);
        }
    }
}, 1000);
window.addEventListener('beforeunload', (event) => {
	if (window.localStorage) {
		let tmp = JSON.stringify(player, undefined, 1);
		localStorage.setItem('kuri_mult', tmp);
	}
});
if (window.localStorage) {
	let data = localStorage.getItem('kuri_mult');
	if(data){
		player = JSON.parse(data);
	}
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
        ]
    }
    document.location.reload();
}
for(var i = player.mult.length - 1;i >= 0;i--){
    if(i == 0){
        document.getElementById("money").innerHTML = Text(player.money);
        document.getElementById("gram").innerHTML = Textg(Mul(KURI,player.money));
        document.getElementsByTagName("tr")[1].getElementsByTagName("td")[2 * i].innerHTML = Text(player.money);
    }else{
        document.getElementsByTagName("tr")[1].getElementsByTagName("td")[2 * i].innerHTML = Text(player.mult[i - 1].amount);
    }
    Mchange(i,0);
    Tchange(i,0)
    player.mult[i].time[0] = player.mult[i].time[1];
    document.getElementsByTagName("tr")[3].getElementsByTagName("span")[i].innerHTML = "　" + player.mult[i].time[0] + "/" + player.mult[i].time[1] + "　";
}