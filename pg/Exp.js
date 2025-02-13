var dec = [3,3];
var cl = 6;
var letter_type = 1;
class Exp { 
    constructor(num,e) { 
        this.num = (e === undefined) ? Math.log10(num) : num;
        this.e = (e === undefined) ? 0 : e;
    }
}
function Sum(X,Y){
    if(X.e == Y.e + 1 && X.e < 1000){
        Y = Up(Y);
    }
    if(X.e == 0 && Y.e == 0 && Math.abs(X.num - Y.num) < cl){
        return Ud(_Sum(X,Y));
    }else if((X.e < Y.e) || (X.e == Y.e && X.num < Y.num)){
        return Y;
    }else{
        return X;
    }
}
function _Sum(X,Y){
	return new Exp(X.num + Math.log10(1 + Math.pow(10,Y.num - X.num)),X.e);
}
function Sub(X,Y){
    if(X.e == Y.e + 1 && X.e < 1000){
        Y = Up(Y);
    }
    if(X.e == 0 &&  Y.e == 0 && X.num - Y.num < cl && X.num > Y.num ){
        return Ud(_Sub(X,Y));
    }else if((X.e == Y.e && X.num <= Y.num) || X.e < Y.e){
        return new Exp(-Infinity,0);
    }else{
        return X;
    }
}
function _Sub(X,Y){
	return new Exp(X.num + Math.log10(1 - Math.pow(10,Y.num - X.num)),X.e);
}
function Mul(X,Y){
	if(X.e >= 1 && Y.e >= 1){
		var Z;
		if(X.e == 0){
			Z = new Exp(Math.log10(X.num),0);
		}else{
			Z = new Exp(X.num,X.e - 1);
		}
		var W;
		if(Y.e == 0){
			W = new Exp(Math.log10(Y.num),0);
		}else{
			W = new Exp(Y.num,Y.e - 1);
		}
		Z = Sum(Z,W);
		return Ud(new Exp(Z.num,Z.e + 1));
	}else{
		if(X.e != Y.e && X.e == Y.e + 1 && X.e < 1000){
  	      Y = Up(Y);
    	}
   		if(X.num == -Infinity || Y.num == -Infinity){
   		    return new Exp(-Infinity,0);
  	 	}if(X.e == 0 &&  Y.e == 0){
   	   		return Ud(_Mul(X,Y));
    	}else if(X.e < Y.e){
   		    return Y;
   		}else{
			return X;
		}
	}
}
function Pow(X,Y){
	var Z;
	if(X.e == 0){
		if(X.num < 1){
			if(Y.e == 0){
				return Ud(new Exp(X.num * Math.pow(10,Y.num),0)); 
			}else{
				return new Exp(-Infinity,0); 
			}
		}
		Z = new Exp(Math.log10(X.num),0);
	}else{
		Z = new Exp(X.num,X.e - 1);
	}
	Z = Mul(Z,Y);
	return Ud(new Exp(Z.num,Z.e + 1));
}
function Sqr(X,Y){
	var Z;
	if(X.e == 0){
		if(X.num < 1){
			if(Y.e == 0){
				return Ud(new Exp(X.num / Math.pow(10,Y.num),0)); 
			}else{
				return new Exp(0,0); 
			}
		}
		Z = new Exp(Math.log10(X.num),0);
	}else{
		Z = new Exp(X.num,X.e - 1);
	}
	Z = Div(Z,Y);
	return Ud(new Exp(Z.num,Z.e + 1));
}
function Log(X,Y){
	var Z;
	if(X.e == 0){
		if(X.num <= 0){
			return new Exp(-Infinity,0); 
		}
		Z = new Exp(Math.log10(X.num),0);
	}else{
		Z = new Exp(X.num,X.e - 1);
	}
	var W;
	if(Y.e == 0){
		W = new Exp(Math.log10(Y.num),0);
	}else{
		W = new Exp(Y.num,Y.e - 1);
	}
	Z = Div(Z,W);
	return Ud(Z);
}
function Div(X,Y){
	if(Y.e == 0 && Y.num == 0){
		return X;
	}
	if(X.e >= 1 && Y.e >= 1){
		var Z;
		if(X.e == 0){
			Z = new Exp(Math.log10(X.num),0);
		}else{
			Z = new Exp(X.num,X.e - 1);
		}
		var W;
		if(Y.e == 0){
			W = new Exp(Math.log10(Y.num),0);
		}else{
			W = new Exp(Y.num,Y.e - 1);
		}
		Z = Sub(Z,W);
		return Ud(new Exp(Z.num,Z.e + 1));
	}else{
		if(X.e != Y.e && X.e == Y.e + 1 && X.e < 1000){
  	      Y = Up(Y);
    	}else if(X.e != Y.e && Y.e == X.e + 2 && X.e < 1000){
  	      X = Up(X);
    	}
   		if(X.num == -Infinity || Y.num == -Infinity){
   		    return new Exp(-Infinity,0);
  	 	}if(X.e == 0 &&  Y.e == 0){
   	   		return Ud(_Div(X,Y));
    	}else if(X.e < Y.e){
   		    return Y;
   		}else{
			return X;
		}
	}
}
function _Mul(X,Y){
	return new Exp(X.num + Y.num,X.e);
}
function _Div(X,Y){
	return new Exp(X.num - Y.num,X.e);
}
function Up(X){
    return new Exp(Math.log10(X.num),X.e + 1);
}
function Ud(X){
	if(X.num < -cl && X.e == 0){
		X = new Exp(-Infinity,0);
	}else if(X.num < 10 && X.e != 0){
		X.e--;
		X.num = Math.pow(10,X.num);
	}else if(X.num > 10000000000){
		X.e++;
		X.num = (X.e == 1) ? X.num /= 1000000000.0 : Math.log10(X.num);
	}
	return X;
}
function Isbig(X,Y){
	var _X = Ud(new Exp(X.num,X.e));
	var _Y = Ud(new Exp(Y.num,Y.e));
	if(_X.e > _Y.e || (_X.e == _Y.e && _X.num > _Y.num)){
		return true;
	}else{
		return false;
	}
}
function Round(X){
	if(X.num < cl && X.e == 0){
		return Ud(new Exp(Math.log10(Math.round(Math.pow(10,X.num))),X.e));
	}
	return X;
}
function Ceil(X){
	if(X.num < cl && X.e == 0){
		return Ud(new Exp(Math.log10(Math.ceil(Math.pow(10,X.num))),X.e));
	}
	return X;
}
function Floor(X){
	if(X.num < cl && X.e == 0){
		return Ud(new Exp(Math.log10(Math.floor(Math.pow(10,X.num))),X.e));
	}
	return X;
}

function Tow(X,Y){
	if (X.e == 0 && Y > 1)
	{
		return Ud(new Exp(10 * X.num * Math.pow(10, 10 * (Y % 1)), X.e + Math.floor(Y)));
	}
	else
	{
		return Ud(new Exp(X.num * Math.pow(10, 10 * (Y % 1)), X.e + Math.floor(Y)));
	}
}
function Text(X){
	switch(letter_type){
		case 0: return Textf(X); break;
		case 1: return Textj(X); break;
		case 2: return Texti(X); break;
		case 3: return Textg(X); break;
	}
}
function Textf(X){
    if(X.num == -Infinity){
		return "0";
    }else if(X.e == 0 && X.num < 10){
        return Math.pow(10,X.num).toFixed(dec[0]);
    }else if(X.e == 0){
        return Math.pow(10,X.num % 1).toFixed(dec[1]) + "e" + Math.floor(X.num);
    }else if(X.e >= 8){
    	return "10↑↑" + (X.e + 2 + (Math.log10(X.num) - 1) / 9).toFixed(dec[1]);
	}else{
    var rt = "";
        for(var i = 0;i < X.e;i++){
            rt += "e";
        }
        return rt + Math.pow(10,X.num % 1).toFixed(dec[1]) + "e" + Math.floor(X.num);
    }
}
const INF = new Exp(1024 * Math.log10(2),0);
function Texti(X){
	if(X.num == -Infinity){
		return "0";
	}
	return "∞^" + Textf(Log(X,INF));
}
function Texte(X){
	var rt = "";
	if(X.e >= 8){
    	return "10↑↑" + (X.e + 2 + (Math.log10(X.num) - 1) / 9).toFixed(dec[1]);
	}
    for(var i = 0;i < X.e;i++){
        rt += "10<sup>";
    }
    rt += Math.pow(10,X.num % 1).toFixed(dec[1]) + "×10<sup>" + Math.floor(X.num) + "</sup>";
	for(var i = 0;i < X.e;i++){
        rt += "</sup>";
    }
	return rt;
}
