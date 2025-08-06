function Inputlba(){
    let s = Number(document.getElementById("lbs").value);
    let l = Number(document.getElementById("lbl").value);
    let cs = Number(document.getElementById("cs").value);
    document.getElementById("lba").value = cs + s + 10 * l;
    Stamina();
}
function Inputacth(){
    let hd = Number(document.getElementById("holdd").value);
    let ap = Number(document.getElementById("actp").value) / 100.0;
    document.getElementById("acth").value = hd * 24 * ap;
    Stamina();
}
function Stamina(){
    let lba = Number(document.getElementById("lba").value);
    let acth = Number(document.getElementById("acth").value);
    let roopt = Number(document.getElementById("roopt").value);
    if(roopt == 0 || acth == 0) return;
    let rval = Math.floor(acth * 3600 / roopt);
    document.getElementById("rval").innerText = rval;
    document.getElementById("sval").innerText = Math.round(lba / rval);
    document.getElementById("svalx").innerText = lba / rval;
}
Stamina();