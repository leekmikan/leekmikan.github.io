let player = {
    n_base:10,
    onum:0,
    pt_num:-Infinity,
    max_dig:5,
    pt_base:10,
    digit:3,
    upg_bit:0,
    auto_buy:0,
    money:-Infinity,
    time: 0,
    reach_max: false,
    reach_max3: false,
}
const auto_costm = Math.log10(1.2);
const base_d_costs = [2,3,6,10,138,200,530,89515];
const base_u_costm_e = 1.1;
const base_u_cost_s = Math.PI;
const upg_cost = [3,4,7,60,100];
const capped = 1e+300;
const end_game = 1924;
function gid(id){
    return document.getElementById(id);
}
function addn(){
    player.onum++;
    show_n();
}
function show_n(){
    let ac = player.auto_buy;
    let pbs = Math.floor(player.pt_base);
    if((player.upg_bit & 1) > 0) ac *= Math.log10(10 + player.time / 10);
    if((player.upg_bit & 2) > 0) ac *= Math.pow(Math.min(player.auto_buy,5000) + 1,((player.upg_bit & 16) > 0) ? 1.2 : 0.4);
    if((player.upg_bit & 4) > 0) pbs += pbs - 10;
    gid("money").innerText = dn(player.money);
    gid("acos").innerText = (player.auto_buy >= 63133) ? dn(5000 + (player.auto_buy - 63132) * auto_costm * 10) : dn((player.auto_buy + 1) * auto_costm + 1);
    gid("base").innerText = player.n_base;
    gid("p_base").innerText = pbs;
    if(player.n_base <= 2){
        gid("base_d_cos").innerText = "Infinity";
    }else{
        gid("base_d_cos").innerText = dn(base_d_costs[10 - player.n_base]);
    }
    for(let i = 0;i < upg_cost.length - 1;i++){
        gid("upg" + i + "cos").innerText = dn(upg_cost[i]);
        gid("upg" + i).innerText = ((player.upg_bit & (1 << i)) > 0) ? "Yes" : "No";
    }
    gid("base_u_cos").innerText = dn(base_u_cost_s * Math.pow(base_u_costm_e + (player.pt_base - 10) / 1000,player.pt_base - 10));
    gid("auto_s").innerText = Math.floor(ac);
    player.onum += ac / 10; 
    player.time++;
    gid("rast_upg").innerText = ((player.upg_bit & 16) > 0) ? "Resets first 4 Upgrades, 2 bases and auto click.\n" : "Resets first 4 Upgrades, 2 bases and auto click.But, second upgrade is cubed.";
    gid("od").innerHTML = convertToOrdinal(player.onum,player.n_base);
    gid("pt").innerText = player.pt_num >= capped ? dn(player.pt_num) + " (Capped)" : dn(player.pt_num);
}
function convertToOrdinal(x, y) {

    const bigX = BigInt(Math.floor(x));
    const bigY = BigInt(y);
    player.pt_num = -Infinity;
    let etc = "";
    let pbs = player.pt_base;
    if((player.upg_bit & 4) > 0) pbs += pbs - 10;
    if (bigY <= 1n) {
        throw new Error("底yは2以上である必要があります。");
    }
    if (bigX < 0n) {
        throw new Error("xは非負整数である必要があります。");
    }
    if (bigX === 0n) {
        return "0";
    }
    if(bigY == 2){
        if(bigX >= 4n) {
            player.pt_num = pbs * Math.log10(pbs);
            player.reach_max = true;
            return "ψ(Ω)";
        }
    }
    if(bigY == 3){
        if(bigX >= 7625597484987n) {
            player.upg_bit |= 8;
            player.pt_num = (pbs >= 140) ? capped : Math.pow(pbs,pbs) * Math.log10(pbs);
            return "ψ(Ω)";
        }
    }
    // 再帰的に順序数文字列を生成する内部関数
    function toOrdinal(num,first = true) {
        if (num === 0n) return "0";

        let components = [];
        let power = 0n;
        let temp = num;

        // y進数展開を行う
        while (temp > 0n) {
            let coeff = temp % bigY;
            if (coeff > 0n) {
                components.push({ exp: power, coeff: coeff });
            }
            temp = temp / bigY;
            power += 1n;
        }
        if(components.length > player.max_dig){
            components = components.slice(-player.max_dig);
            etc = "+...";
        }
        // 指数の大きい順（降冪の順）に並び替える
        components.reverse();
        let parts = [];
        for (let comp of components) {
            let e = comp.exp;
            let c = comp.coeff;
            if(first) player.pt_num = eadd(player.pt_num,tb(Number(e),player.n_base,pbs) * Math.log10(pbs) + Math.log10(Number(c)) );

            if (e === 0n) {
                // 指数が0のとき（c * y^0 = c）
                parts.push(c.toString());
            } else {
                // 指数を再帰的に変換
                let E = toOrdinal(e,false);
                let basePart = "";

                // ωの累乗部分のフォーマットを決定
                if (E === "1") {
                    basePart = "ω";
                } else {
                    basePart = "ω<sup>" + E + "</sup>";
                }

                // 係数cの結合フォーマットを決定
                if (c === 1n) {
                    parts.push(basePart);
                } else {
                    parts.push(basePart + c.toString());
                }
            }
        }

        return parts.join("+");
    }

    return toOrdinal(bigX) + etc;
}

window.onload = function(){
    gid("base").innerText = player.n_base;
    gid("p_base").innerText = player.pt_base;
}

function d(x){
    if(x < 5) return Math.pow(10,x).toFixed(player.digit);
    return Math.pow(10,x % 1).toFixed(player.digit) + "e" + Math.floor(x);
}

function dn(x){
    if(x < 5) return Math.round(Math.pow(10,x));
    return Math.pow(10,x % 1).toFixed(player.digit) + "e" + Math.floor(x);
}

function eadd(x,y){
    if(Math.abs(x - y) > 8) return Math.max(x,y);
    if(x == -Infinity && y == -Infinity) return -Infinity;
    let minv = Math.min(x,y);
    return minv + Math.log10(Math.pow(10,x - minv) + Math.pow(10,y - minv));
}

function esub(x,y){
    if(x == -Infinity && y == -Infinity) return -Infinity;
    if(x < y) return -Infinity;
    if(x - y > 8) return x;
    return y + Math.log10(Math.pow(10,x - y) - 1);
}

function efloor(x){
    if(x <= 0 || x >= 8) return x;
    return Math.log10(Math.floor(Math.pow(10,x)));
}

function tb(num,b1,b2){
    let power = 0;
    let rt = 0;
    while (num > 0) {
        let coeff = num % b1;
        if (coeff > 0) {
            rt += coeff * Math.pow(b2,power);
        }
        num = Math.floor(num / b1);
        power++;
    }
    return rt;
}
function abuy(){
    let am;
    if(player.money >= 5000){
        am = Math.floor((player.money - 5000) / (auto_costm * 10)) + 63133;
        if(player.auto_buy < am){
            player.auto_buy = am;
            player.money = esub(player.money,5000 + auto_costm * am * 10);
            show_n();
        }
    }else{
        am = Math.floor((player.money - 1) / auto_costm);
        if(player.auto_buy < am){
            player.auto_buy = am;
            player.money = esub(player.money,1 + auto_costm * am);
            show_n();
        }
    }
}

function base_down(){
    if(player.n_base <= 2) return;
    if(player.money > base_d_costs[10 - player.n_base]){
        player.n_base--;
        player.onum = 0;
        player.money = -Infinity;
        player.time = 0;
        show_n();
    }
}

function base_up(){
    if(player.money > base_u_cost_s * Math.pow((base_u_costm_e + (player.pt_base - 10) / 1000),player.pt_base - 10)){
        player.pt_base++;
        if((player.upg_bit & 8) == 0) player.n_base = 10;
        player.onum = 0;
        player.money = -Infinity;
        player.time = 0;
        show_n();
    }
}
function get_pt(){
    player.money = eadd(player.money,player.pt_num);
    player.onum = 0;
    player.time = 0;
    show_n();
}
function upg_buy(x){
    if(x == 4){
        if(player.reach_max){
            player.n_base = 10;
            player.onum = 0;
            player.pt_base = 10;
            player.upg_bit = 16;
            player.auto_buy = 0;
            player.money = 0;
            player.time = 0;
            player.reach_max = false;
            show_n();
        }
        return;
    }
    if(x == 5){
        let pbs = Math.floor(player.pt_base);
        if((player.upg_bit & 4) > 0) pbs += pbs - 10;
        if(pbs >= end_game){
            alert("You Win.");
        }
        return;
    }
    if(player.money > upg_cost[x] && ((player.upg_bit & (1 << x)) == 0)){
        player.money = esub(player.money,upg_cost[x]);
        player.upg_bit |= (1 << x);
        show_n();
    } 
}
setInterval(function(){
    show_n();
}, 100);

document.addEventListener('keydown', (event) => {
    const pressedKey = event.key.toUpperCase();
    switch(pressedKey){
        case "A":
            abuy();
            break;
        case "C":
            get_pt();
            break;
        case "U":
            base_up();
            break;
        case "D":
            base_down();
            break;
        case "I":
            addn();
            break;
    }
});
