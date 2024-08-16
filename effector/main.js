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
}
function Wexport(){
    if(!read_f) {
        alert("ファイルを入れてください");
        return;
    }
    else if(md){
        wd = new WaveData(fileReader);
    }
    if(document.getElementById("sp").checked){
        wd.Speed(Number(document.getElementById("speed").value),Number(document.getElementById("pitch").value));
    }
    wd.Export(2,fileInput);
    md = true;
}