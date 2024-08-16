let fileInput = document.getElementById('file');
let fileReader = new FileReader();
let wd;
let md = false;
fileInput.onchange = () => {
    fileReader.readAsArrayBuffer(fileInput.files[0]);
};
fileReader.onload = () =>{
    read_f = true;
    wd = new WaveData(fileReader);
    if(wd.sample !== null){
        document.getElementById("e5sp").value = wd.sample;
    }
}
const E_LEN = 2;
const MAX_COST = 3;
function Wexport(){
    if(!read_f) {
        alert("ファイルを入れてください");
        return;
    }
    else if(md){
        wd = new WaveData(fileReader);
    }
    let true_x = 0;
    for(let i = 0;i < E_LEN;i++){
        true_x = (document.getElementById("e" + i).checked) ? true_x + 1 : true_x;
    }
    if(true_x > MAX_COST){
        alert("エフェクトが多すぎます(現在、テストのため3つに制限)");
        return;
    }
    //順番かえるかも
    if(document.getElementById("e0").checked){
        let arg1 = Rg(0.5,umber(document.getElementById("speed").value),4);
        let arg2 = Rg(-12,Number(document.getElementById("pitch").value),24);
        wd.Speed(arg1,arg2);
    }
    if(document.getElementById("e1").checked){
        let arg1 = Rg(60,Number(document.getElementById("e1bpm").value),360);
        let arg2 = Rg(0,Number(document.getElementById("e1del").value),wd.Time());
        wd.Swap([0,3,2,1],arg1,arg2);
    }
    if(document.getElementById("e3").checked){
        wd.Voicecanseller();
    }
    if(document.getElementById("e7").checked){
        let arg1 = Rg(0.5,Number(document.getElementById("e7speed").value),4);
        let arg2 = Rg(0,Number(document.getElementById("e7ps").value),0.5);
        wd.Flanger(arg1,arg2);
    }
    if(document.getElementById("e2").checked){
        wd.LRdel(1000);
    }
    if(document.getElementById("e4").checked){
        wd.Mono();
    }
    if(document.getElementById("e5").checked){
        let arg = Rg(1000,Number(document.getElementById("e5sp").value),wd.sample);
        wd.Quality(arg);
    }
    if(document.getElementById("e6").checked){
        wd.Reverse();
    }
    if(document.getElementById("mn").checked){
        wd.Export(1,fileInput);
    }else{
        wd.Export(2,fileInput);
    }
    md = true;
}
function Rg(mn,x,mx){
    return (isNaN(x)) ? mn : ((mn < x) ? ((x < mx) ? x : mx) : mx);
}