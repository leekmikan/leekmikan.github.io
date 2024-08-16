let fileInput = document.getElementById('file');
let fileReader = new FileReader();
let fileInput2 = document.getElementById('file2');
let fileReader2 = new FileReader();
let wd;
let md = false;
let read_f = false;
let read_f2 = false;
fileInput.onchange = () => {
    fileReader.readAsArrayBuffer(fileInput.files[0]);
};
fileReader.onload = () =>{
    wd = new WaveData(fileReader);
    if(wd.sample !== undefined){
        read_f = true;
    }
}
fileInput2.onchange = () => {
    fileReader2.readAsArrayBuffer(fileInput2.files[0]);
};
fileReader2.onload = () =>{
    wd2 = new WaveData(fileReader2);
    if(wd2.sample !== undefined){
        read_f2 = true;
    }
}
const E_LEN = 8;
const MAX_COST = 3;
function Wexport(){
    let true_x = 0;
    for(let i = 0;i < E_LEN;i++){
        true_x = (document.getElementById("e" + i).checked) ? true_x + 1 : true_x;
    }
    if(!confirm("開始しますか　実行エフェクト数：" + true_x + "個")) return;
    if(!read_f) {
        alert("ファイルを入れてください");
        return;
    }else if(document.getElementById("e8").checked && !read_f2){
        alert("IRファイルを入れてください");
        return;
    }
    else if(md){
        wd = new WaveData(fileReader);
    }
    if(true_x > MAX_COST){
        alert("エフェクトが多すぎます(現在、テストのため3つに制限)");
        return;
    }
    //順番かえるかも
    if(document.getElementById("e1").checked){
        console.log("Beatswap");
        let arg1 = Rg(60,Number(document.getElementById("e1bpm").value),360);
        let arg2 = Rg(0,Number(document.getElementById("e1del").value),wd.Time());
        wd.Swap([0,3,2,1],arg1,arg2);
    }
    if(document.getElementById("e3").checked){
        console.log("VoiceCanceller");
        wd.Voicecanseller();
    }
    if(document.getElementById("e7").checked){
        console.log("Flanger");
        let arg1 = Rg(0.5,Number(document.getElementById("e7speed").value),4);
        let arg2 = Rg(0,Number(document.getElementById("e7ps").value),0.5);
        wd.Flanger(arg1,arg2);
    }
    if(document.getElementById("e8").checked){
        console.log("ConvolutionReverb");
        let arg1 = Rg(0,Number(document.getElementById("e8pw").value),1);
        let arg2 = Rg(0,Number(document.getElementById("e8ds").value),800);
        wd.ConvolutionReverb(wd2,arg1,arg2);
    }
    if(document.getElementById("e0").checked){
        console.log("SpeedChange");
        let arg1 = Rg(0.5,Number(document.getElementById("speed").value),4);
        let arg2 = Rg(-12,Number(document.getElementById("pitch").value),24);
        wd.Speed(arg1,arg2);
    }
    if(document.getElementById("e2").checked){
        console.log("LRdel");
        wd.LRdel(1000);
    }
    if(document.getElementById("e4").checked){
        console.log("Mono");
        wd.Mono();
    }
    if(document.getElementById("e5").checked){
        console.log("Quality");
        let arg = Rg(1000,Number(document.getElementById("e5sp").value),wd.sample);
        wd.Quality(arg);
    }
    if(document.getElementById("e6").checked){
        console.log("Reverse");
        wd.Reverse();
    }
    console.log("Export");
    wd.vol = Rg(0,Number(document.getElementById("vol").value),10);
    if(document.getElementById("mn").checked){
        wd.Export(1,fileInput);
    }else{
        wd.Export(2,fileInput);
    }
    console.log("End");
    md = true;
}
function Rg(mn,x,mx){
    return (isNaN(x)) ? mn : ((mn <= x) ? ((x <= mx) ? x : mx) : mn);
}