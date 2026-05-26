player = {
    reply: -Infinity,
    retweets: -Infinity,
    likes: -Infinity,
    followers: -Infinity,
    views: -Infinity,
    money: -Infinity,
    leeks: -Infinity,
    vupgsb: 0,
    lupgsb: 0,
    fupgsb: 0,
    mkupgsb: 0,
    reach_miku: false,
    auto_buy: false,
    mupgs:[0,0,0,0],
    creator: [0,0,0],
    creator_upgs: [0,0,0],
    sacrifice: -Infinity,
}
const jp_n = ["","万","億","兆","京","垓","秭","穣","溝","澗","正","載","極","恒河沙","阿僧祇","那由他","不可思議","無量大数"];
const digit = 3;

const vupgs = [2,3,8,12];
const lupgs = [2,4,7,390];
const fupgs = [1 + Math.log10(2),2,3];
const mkupgs = [0,1,Math.log10(200),40,52,68,69,3939];
const crupgs = [72,100,150];
const crupgse = [1.3,1.5,2];
let page = 0;
function d(x){
    if(x == -Infinity) return 0;
    else if(x < 4) return Math.pow(10,x).toFixed(digit);
    else if(x < 72) return Math.pow(10,x % 4).toFixed(digit) + jp_n[Math.floor(x / 4)];
    else return Math.pow(10,x % 1).toFixed(digit) + "e" + Math.floor(x);
}

function dn(x){
    if(x == -Infinity) return 0;
    else if(x < 4) return Math.round(Math.pow(10,x));
    else if(x < 72) return Math.pow(10,x % 4).toFixed(digit) + jp_n[Math.floor(x / 4)];
    else return Math.pow(10,x % 1).toFixed(digit) + "e" + Math.floor(x);
}

function gid(id){
    return document.getElementById(id);
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

function updates(){
    if(player.mkupgsb & 64){
        let eachm = [Math.log10(Math.log10(player.creator[0] + 1) + 1),Math.log10(Math.log10(player.creator[1] + 1) + 1),Math.log10(Math.log10(player.creator[2] + 1) + 1)];
        player.creator[0] += Math.log10(Math.log10(Math.max(player.likes / 10 + eachm[1] + eachm[2], 0) + 1) + 1) / Math.pow(Math.log10(player.creator[0] * 5 + 10),2);
        player.creator[1] += Math.log10(Math.log10(Math.max(player.followers / 10 + eachm[0] + eachm[2], 0) + 1) + 1) / Math.pow(Math.log10(player.creator[1] * 5 + 10),2);
        player.creator[2] += Math.log10(Math.log10(Math.max(player.retweets / 10 + eachm[0] + eachm[1], 0) + 1) + 1) / Math.pow(Math.log10(player.creator[2] * 5+ 10),2);
    }
    if(player.lupgsb & 8) player.sacrifice = eadd(player.sacrifice,player.followers);
    if(player.fupgsb & 2) player.reply = eadd(player.reply,player.sacrifice / 10);
    let lmult = 0;
    if(player.vupgsb & 4) lmult += player.sacrifice < 0 ? 0 : Math.pow(player.sacrifice,0.8);
    if(player.vupgsb & 1) player.likes = eadd(player.likes,(Math.log10(player.views / 2 + 1) * (player.fupgsb & 4 ? 3 : 1) - 1 + lmult) * (player.mupgs[1] * Math.pow(Math.log10(player.creator[1] / 33 + 10),1 + player.creator_upgs[1]) + 1));
    if(player.vupgsb & 2) player.followers = eadd(player.followers,(player.likes / 3 - 1) * (player.mupgs[2] * Math.pow(Math.log10(player.creator[1] / 33 + 10),1 + player.creator_upgs[1]) + 1));
    let rpow = 0.01;
    if(player.lupgsb & 4) rpow = player.mkupgsb & 2 ? 0.5 : 0.1;
    if(player.mkupgsb & 2) rpow = 0.5;
    if(player.lupgsb & 2) player.retweets = eadd(player.retweets,(Math.pow(Math.max(player.likes + player.followers,0),rpow) - 2) * (player.mkupgsb & 16 ? 2 : 1));
    if(player.vupgsb & 8) player.money = eadd(player.money,(player.views / 12 - 1) * (player.mupgs[3] * Math.pow(Math.log10(player.creator[1] / 33 + 10),1 + player.creator_upgs[1]) + 1));
    let vmult = 0;
    let sacmult = 5;
    vmult += player.sacrifice < 0 ? 0 : 1 + Math.sqrt(player.sacrifice) * sacmult;
    if(player.mkupgsb & 1) vmult += 8;
    if(player.lupgsb & 1) vmult += player.likes < 0 ? 0 : player.likes;

    let tmp = (player.likes - 1 + (player.retweets < 0 ? 0 : player.retweets) * 5 + vmult) * Math.pow(player.mupgs[0] * Math.pow(Math.log10(player.creator[1] / 33 + 10),1 + player.creator_upgs[1]) + 1,0.5 / Math.pow(Math.log10(player.creator[2] / 1 + 10),1 + player.creator_upgs[2]));
    let p1 = 0.4 * (eadd(tmp,0) - Math.log10(eadd(tmp,0) + 1));
    if(player.mkupgsb & 4) p1 = Math.pow(p1,1/(Math.log10(player.leeks * 2 + 1) + 1));
    let p2 = 1;
    let p2_start = 308;
    if(player.mkupgsb & 64) p2_start *= Math.pow(Math.log10(player.creator[0] / 10 + 10),1 + player.creator_upgs[0]);
    if(tmp >= p2_start) p2 = 1 + (tmp - p2_start) / 1000;
    gid("p1").innerText = "/" + d(p1);
    gid("p2").innerText = "^1/" + p2.toFixed(digit);

    player.views = eadd(player.views,(player.likes - 1 + (player.retweets < 0 ? 0 : player.retweets) * 5 - p1 + vmult) * (player.mupgs[0] * Math.pow(Math.log10(player.creator[1] / 33 + 10),1 + player.creator_upgs[1]) + 1) / p2);
}

function display(){
    gid("reply").innerText = dn(player.reply);
    gid("retweets").innerText = dn(player.retweets);
    gid("likes").innerText = dn(player.likes);
    gid("views").innerText = dn(player.views);
    gid("followers").innerText = dn(player.followers);
    gid("money").innerText = dn(player.money);
    gid("fire").innerText = dn(player.sacrifice);
    if(player.mkupgsb & 64){
        gid("creator").style.display = "block";
        gid("mupg0_val").innerText = (player.mupgs[0] * Math.pow(Math.log10(player.creator[1] / 33 + 10),1 + player.creator_upgs[1])).toFixed(digit);
        gid("mupg1_val").innerText = (player.mupgs[1] * Math.pow(Math.log10(player.creator[1] / 33 + 10),1 + player.creator_upgs[1])).toFixed(digit);
        gid("mupg2_val").innerText = (player.mupgs[2] * Math.pow(Math.log10(player.creator[1] / 33 + 10),1 + player.creator_upgs[1])).toFixed(digit);
        gid("mupg3_val").innerText = (player.mupgs[3] * Math.pow(Math.log10(player.creator[1] / 33 + 10),1 + player.creator_upgs[1])).toFixed(digit);
    }else{
        gid("creator").style.display = "none";
        gid("mupg0_val").innerText = player.mupgs[0];
        gid("mupg1_val").innerText = player.mupgs[1];
        gid("mupg2_val").innerText = player.mupgs[2];
        gid("mupg3_val").innerText = player.mupgs[3];
    }
    gid("leek_val").innerText = dn(player.leeks);
    if(player.fupgsb & 1){
        gid("sac_tab").style.display = "inline-block";
        let sacmult = 5;
        gid("sacv").innerText = "×" + d(player.sacrifice == -Infinity ? player.sacrifice : 1 + Math.sqrt(Math.max(player.sacrifice, 0)) * sacmult) + " → ×" + d(1 + (Math.sqrt(Math.max(eadd(player.sacrifice, player.followers), 0))) * sacmult);
    }else{
        gid("sac_tab").style.display = "none";
    }
    for(let i = 0;i < vupgs.length;i++){
        if(player.vupgsb & (1 << i)) gid("vupg" + i).classList = "upg bg";
        else if(player.views >= vupgs[i])  if(player.auto_buy){vupg_buy(i);}else{ gid("vupg" + i).classList = "upg yb"}
        else gid("vupg" + i).classList = "upg cb";
    }
    for(let i = 0;i < lupgs.length;i++){
        if(player.lupgsb & (1 << i)) gid("lupg" + i).classList = "upg bg";
        else if(player.likes >= lupgs[i])  if(player.auto_buy){lupg_buy(i);}else{ gid("lupg" + i).classList = "upg yb"}
        else gid("lupg" + i).classList = "upg cb";
    }
    for(let i = 0;i < fupgs.length;i++){
        if(player.fupgsb & (1 << i)) gid("fupg" + i).classList = "upg bg";
        else if(player.followers >= fupgs[i])  if(player.auto_buy){fupg_buy(i);}else{ gid("fupg" + i).classList = "upg yb"}
        else gid("fupg" + i).classList = "upg cb";
    }
    for(let i = 0;i < mkupgs.length;i++){
        if(player.mkupgsb & (1 << i)) gid("mkupg" + i).classList = "upg bg";
        else if(player.leeks >= mkupgs[i])  gid("mkupg" + i).classList = "upg yb";
        else gid("mkupg" + i).classList = "upg cb";
    }
    if(player.vupgsb & 8){
        gid("moneytab").style.display = "block";
        let s = 0;
        for(let i = 0;i < player.mupgs.length;i++){
            s += player.mupgs[i];
        }
        let cbs = "";
        if(player.money > Math.pow(2, s) && s < 8) cbs = "upg yb";
        else cbs = "upg cb";
        for(let i = 0;i < player.mupgs.length;i++){
            gid("mupg_cost" + i).innerText = s >= 8 ? "∞" : dn(Math.pow(2, s));
            gid("mupg" + i).classList = cbs;
        }
    }else{
        gid("moneytab").style.display = "none";
    }
    if(player.views >= 308){
        gid("miku_reset").style.display = "inline-block";
        gid("miku_tab").style.display = "inline-block";
        gid("leek_get").innerText = dn((player.views - 308) / 39);
        if(player.mkupgsb & 32) player.leeks = eadd(player.leeks, (player.views - 308) / 39 - 2);
    }else{
        gid("miku_reset").style.display = "none";
        if(!player.reach_miku) gid("miku_tab").style.display = "none";
    }
    if(player.mkupgsb & 64){
        gid("song_count").innerText = dn(player.creator[0]);
        gid("art_count").innerText = dn(player.creator[1]);
        gid("mmd_count").innerText = dn(player.creator[2]);
        gid("song_power").innerText = Math.pow(Math.log10(player.creator[0] / 10 + 10),1 + player.creator_upgs[0]).toFixed(digit);
        gid("art_power").innerText = Math.pow(Math.log10(player.creator[1] / 33 + 10),1 + player.creator_upgs[1]).toFixed(digit);
        gid("mmd_power").innerText = Math.pow(Math.log10(player.creator[2] / 1 + 10),1 + player.creator_upgs[2]).toFixed(digit);
        for(let i = 0;i < crupgs.length;i++){
            gid("crupg_val" + i).innerText = player.creator_upgs[i];
            gid("crupg_cost" + i).innerText = d(crupgs[i] * Math.pow(crupgse[i], player.creator_upgs[i]));
            if(player.leeks >= crupgs[i] * Math.pow(crupgse[i], player.creator_upgs[i])) gid("crupg" + i).classList = "upg yb";
            else gid("crupg" + i).classList = "upg cb";
        }
    }
}

function vupg_buy(i){
    if(vupgs[i] < player.views && !(player.vupgsb & (1 << i))){
        player.views = efloor(esub(player.views, vupgs[i]));
        player.vupgsb |= (1 << i);
    }
}

function lupg_buy(i){
    if(lupgs[i] < player.likes && !(player.lupgsb & (1 << i))){
        player.likes = efloor(esub(player.likes, lupgs[i]));
        player.lupgsb |= (1 << i);
    }
}

function fupg_buy(i){
    if(fupgs[i] < player.followers && !(player.fupgsb & (1 << i))){
        player.followers = efloor(esub(player.followers, fupgs[i]));
        player.fupgsb |= (1 << i);
    }
}

function mupg_buy(i){
    let s = 0;
    for(let i = 0;i < player.mupgs.length;i++){
        s += player.mupgs[i];
    }
    if(Math.pow(2,s) < player.money && s < 8){
        player.money = efloor(esub(player.money, Math.pow(2,s)));
        player.mupgs[i]++;
        mupg_reset(false);
    }
}

function mkupg_buy(i){
    if(mkupgs[i] < player.leeks && !(player.mkupgsb & (1 << i))){
        player.leeks = efloor(esub(player.leeks, mkupgs[i]));
        player.mkupgsb |= (1 << i);
    }
    if(i == 3){
        player.auto_buy = !player.auto_buy;
        gid("auto_buy").innerText = player.auto_buy ? "ON" : "OFF";
    }
}

function sacrifice(){
    if(player.lupgsb & 8) return;
    player.sacrifice = eadd(player.sacrifice,player.followers);
    player.followers = -Infinity;
    player.views = Math.log10(201);
    player.likes = -Infinity;
    if(!player.reach_miku) player.vupgsb = (player.vupgsb & 8) ? 8 : 0;
    if(!player.reach_miku) player.lupgsb = 0;
    if(!player.reach_miku) player.fupgsb = 1;
    player.reply = -Infinity;
    player.retweets = -Infinity;
}

function mupg_reset(reset){
    if(reset) player.mupgs = [0,0,0,0];
    player.followers = -Infinity;
    player.views = Math.log10(201);
    player.likes = -Infinity;
    player.vupgsb = 8;
    player.lupgsb = 0;
    player.fupgsb = 1;
    player.reply = -Infinity;
    player.retweets = -Infinity;
}
function miku_reset(){
    player.leeks = eadd(player.leeks,(player.views - 308) / 39);
    player.reach_miku = true;
    player.followers = -Infinity;
    player.views = Math.log10(201);
    player.likes = -Infinity;
    player.vupgsb = 0;
    player.lupgsb = 0;
    player.fupgsb = 0;
    player.reply = -Infinity;
    player.retweets = -Infinity;
    player.money = -Infinity;
    player.sacrifice = -Infinity;
    player.mupgs = [0,0,0,0];
}

function crupg_buy(i){
    if(player.leeks >= crupgs[i] * Math.pow(crupgse[i], player.creator_upgs[i])){
        player.leeks = efloor(esub(player.leeks, crupgs[i] * Math.pow(crupgse[i], player.creator_upgs[i])));
        player.creator_upgs[i]++;
    }
    else gid("crupg" + i).classList = "upg cb";
}

let save_interval = 0;
setInterval(function(){
    if(player.leeks <= 3939){
        updates();
    }
    if(player.mkupgsb & 128){
        gid("game").style.display = "none";
        gid("win").style.display = "block";
    }
    display();
    save_interval++;
    if(save_interval >= 100){
        save(true);
        save_interval = 0;
    }
}, 100);

function pg_change(){
    for(let i = 0;i < 4;i++){
        if(i == page) gid("pg" + i).style.display = "block";
        else gid("pg" + i).style.display = "none";
    }
}

window.addEventListener("load",function(){
    load();
    pg_change();
});

document.addEventListener('keypress', keypress_ivent);

function keypress_ivent(e) {
	if(e.code === 'ArrowLeft'){
        if(page > 0) page--;
        pg_change();
    }
    if(e.code === 'ArrowRight'){
        if(page < 3) page++;
        pg_change();
    }
    if(e.code === 'KeyS'){
        if(player.fupgsb & 1) sacrifice();
    }
	return false; 
}

function save(auto=false){
    localStorage.setItem("sns_idle", btoa(JSON.stringify(player)));
    if(!auto) alert("セーブしました");
}

function delete_save(){
    let ld = confirm("セーブデータを消去しますか？") ? (confirm("消去されるのは嫌ですか？") ? false : true) : false;
    if(ld) {
        localStorage.removeItem("sns_idle");
        window.location.reload();
    }
}

function export_save(){
    navigator.clipboard.writeText(btoa(JSON.stringify(player)));
    alert("セーブデータをクリップボードにコピーしました");
}

function import_save(){
    let data = prompt("セーブデータを入力してください");
    try{
        let obj = JSON.parse(atob(data).replace(/:null,/g,":-1e+309,").replace(/:null}/g,":-1e+309}"));
        if(obj != undefined) player = obj;
        else alert("セーブデータが正しくありません");  
    }catch(e){
        alert("セーブデータが正しくありません");
    }
}

function load(){
    let data = localStorage.getItem("sns_idle");
    try{
        let obj = JSON.parse(atob(data).replace(/:null,/g,":-1e+309,").replace(/:null}/g,":-1e+309}"));
        if(obj != undefined) player = obj;
    }catch(e){}
}