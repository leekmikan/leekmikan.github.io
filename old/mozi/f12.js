var wid1 = window.innerWidth;
var wid2 = window.outerWidth;
var hei1 = window.innerHeight;
var counter = 0;
let zoom_level = window.screen.availWidth / document.documentElement.clientWidth;
if(Math.abs(wid1 * zoom_level - wid2) > 50) window.close();
setInterval(function(){
	if(wid1 > window.innerWidth && wid2 == window.outerWidth && window.innerHeight == hei1){
		counter++;
		if(counter >= 5){
			window.close();
		}
	}else if((wid1 != window.innerWidth && wid2 != window.outerWidth) || window.innerHeight != hei1){
		counter = 0;
		wid2 = window.outerWidth;
		wid1 = window.innerWidth;
		hei1 = window.innerHeight;
	}else if(wid1 == window.innerWidth && wid2 == window.outerWidth){
		counter = 0;
	}
}, 30);