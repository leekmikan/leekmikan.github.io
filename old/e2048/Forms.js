var forms = [];
var idnum = 0;
var hold = false;
var dx = 0;
var dy = 0;
var px = 0;
var py = 0;
class Fdata{
	constructor(id,hold){
		this.id = id;
		this.hold = hold;
	}
}
class Form{
	constructor(title,classname,titleclass,buttonclass,x,y,w,h){
		this.classname = classname;
		this.buttonclass = buttonclass;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.title = title;
		this.titleclass = titleclass;
	}
}
function MakeForm(form){
	forms.push(new Fdata(idnum,false));
	var elem = document.createElement('div');
	elem.className = "form " + form.classname;
	elem.id = idnum + "";
	elem.value = idnum;
	elem.style.width = form.w + "px";
	elem.style.height = form.h + "px";	
	elem.style.top = form.y + "px";
	elem.style.left = form.x + "px";
	document.getElementById("main").appendChild(elem);
	var tt = document.createElement('a');
	tt.style.top = "0px";
	tt.style.width = form.w + "px";
	tt.innerText = form.title;
	tt.className = form.titleclass;
	tt.addEventListener('mousedown', event => {
		var x = document.getElementById(elem.id);
		document.getElementById("main").insertBefore(x,document.getElementById("main").nextElementSibling);
  		forms[elem.value].hold = true;
	});
	tt.addEventListener('mouseup', event => {
  		forms[elem.value].hold = false;
	});
	document.getElementById(idnum + "").appendChild(tt);
	var bt = document.createElement('button');
	bt.innerText = "x";
	bt.style.top = "0px";
	bt.className = form.buttonclass;
	bt.addEventListener('click', event => {
  		for(var i = 0;i < forms.length;i++){
			if(forms[i].id + "" == elem.id){
				document.getElementById("main").removeChild(document.getElementById(elem.id + ""));
			}
		}
	});
	document.getElementById(idnum + "").appendChild(bt);
	idnum++;
}
function mousedown(){
  hold = true;
}
function gnum(x){
	var rt = "";
	for(var i = 0;i < x.length;i++){
		if(x[i] == "p"){
			break;
		}
		rt += x[i];
	}
	return Number(rt);
}
function mouseup(){
  	hold = false;
	for(var i = 0;i < forms.length;i++){
		forms[i].hold = false;
	}
}
function init()
{
      window.onmousemove = handleMouseMove;
      function handleMouseMove(event) {
        event = event || window.event;
        target = document.getElementById("output_screen");
        dx = event.screenX - px;	
		dy = event.screenY - py;
		px = event.screenX;
		py = event.screenY;	
		if(hold){
		for(var i = 0;i < forms.length;i++){
			if(forms[i].hold){
				var tmp = document.getElementById(forms[i].id);
				tmp.style.top = gnum(tmp.style.top) + dy + "px";
				tmp.style.left = gnum(tmp.style.left) + dx + "px";
				}
			}
		}
      }
}
function Clear(){
	for(var i = 0;i < forms.length;i++){
		document.getElementById("main").removeChild(document.getElementById(forms[i].id + ""));
	}
}