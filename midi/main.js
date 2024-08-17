function Mexport(){
	let acv = [];
	for(let i = 0;i < 16;i++){
		if(document.getElementById("p" + i).checked){
			acv.push(i);
		}
	}
	pt_adj = Number(document.getElementById("pitch").value);
	sf_adj = Number(document.getElementById("scale").value);
	Read();
	if(acv.length == 0){
		acv = null;
	}
	Export(acv);
}