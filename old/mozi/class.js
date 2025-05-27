var amount = 10;
var lv = 2;
var stage = 1;
var fs = 36;
var dmove = false;
var move = false;
var deg = false;
var maxs = 8;
var maxds = 30;
var time = 1200;
var playing = false;
var color = false;
class tx{
	constructor(tx) {
		this.x = Math.floor(Math.random() * canvas.width);
		this.y = Math.floor(Math.random() * canvas.height);
		this.ms = Math.floor(Math.random() * (maxs - 2)) + 2;
		this.ds = (Math.random() * (maxds - 5) + 5 * Math.PI) / 180.0;
		this.theta = Math.floor(Math.random() * Math.PI * 2);
		this.mtheta = Math.floor(Math.random() * Math.PI * 2);
		this.rgb = [Math.floor(Math.random() * 256),Math.floor(Math.random() * 256),Math.floor(Math.random() * 256)];
		var tmp = Math.floor((this.rgb[0] + this.rgb[1] + this.rgb[2]) / 3);
		if(tmp < 156){
			for(var i = 0;i<3;i++){
				this.rgb[i] = Math.min(255,this.rgb[i] + 156 - tmp);
			}
		}
		this.txt = tx;
		this.clicked = false;
	}
}