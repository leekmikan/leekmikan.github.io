var nname = ["","万","億","兆","京","垓","秭","穣","溝","澗","正","載","極","恒河沙","阿僧祇","那由他","不可思議","無量大数","矜羯羅","阿伽羅","最勝","摩婆羅","阿婆羅","多婆羅","界分","普摩","禰摩","阿婆鈐","弥伽婆","毘攞伽","毘伽婆","僧羯邏摩","毘薩羅","毘贍婆","毘盛伽","毘素陀","毘婆訶","毘薄底","毘佉擔","称量","一持","異路","顛倒","三末耶",
"毘睹羅","奚婆羅","伺察","周広","高出","最妙","泥羅婆","訶理婆","一動","訶理蒲","訶理三","奚魯伽","達攞歩陀","訶魯那","摩魯陀","懺慕陀","瑿攞陀","摩魯摩","調伏","離憍慢","不動","極量","阿麼怛羅","勃麼怛羅","伽麼怛羅","那麼怛羅","奚麼怛羅","鞞麼怛羅","鉢羅麼怛羅","尸婆麼怛羅","翳羅","薜羅","諦羅","偈羅","窣歩羅","泥羅","計羅","細羅",
"睥羅","謎羅","娑攞荼","謎魯陀","契魯陀","摩睹羅","娑母羅","阿野娑","迦麼羅","摩伽婆","阿怛羅","醯魯耶","薜魯婆","羯羅波","訶婆婆","毘婆羅","那婆羅","摩攞羅","娑婆羅","迷攞普","者麼羅","駄麼羅","鉢攞麼陀","毘迦摩","烏波跋多","演説","無尽","出生","無我","阿畔多","青蓮華","鉢頭摩","僧祇","趣","至","阿僧祇","阿僧祇転","無量","無量転",
"無辺","無辺転","無等","無等転","不可数","不可数転","不可称","不可称転","不可思","不可思転","不可量","不可量転","不可説","不可説転","不可説不可説","不可説不可説転"];
var mass_name = ["グラム","キログラム","トン","エベレスト","地球","太陽","天の川銀河","宇宙","マルチバース","メガバース","ギガバース","多元宇宙^"];
var mass_val = [new Exp(0,0),new Exp(3,0),new Exp(6,0),new Exp(Math.log10(1.619) + 20,0),new Exp(Math.log10(5.972) * 27,0),new Exp(Math.log10(1.989) * 33,0),new Exp(Math.log10(2.9835) * 45,0),new Exp(Math.log10(1.5) * 56,0),new Exp(1000000000,0),new Exp(24,1),new Exp(39,1),new Exp(54,1)];
var max_pow_l = 10;
var base_num = new Exp(Math.log10(112),0);
var bit_num = new Exp(Math.log10(2),0);
function Textj(X,pow_l){
    if(pow_l === undefined){
        pow_l = 0;
    }else if(pow_l > max_pow_l){
        return "...";
    }
    if(X.num == -Infinity){
	    return "0";
    }else if(X.num <= 0){
        return Textf(X);
    }
    for(var i = nname.length - 1;i >= 0;i--){
        if(i <= 17){
            if(X.num >= i * 4 && X.e == 0){
                if(Isbig(Div(X,Ud(new Exp(i * 4,0))),new Exp(4,0))){
                    return Textj(Div(X,Ud(new Exp(i * 4,0))),pow_l + 1) + nname[i];
                }else{
                    return Textf(Div(X,Ud(new Exp(i * 4,0)))) + nname[i];
                }
            }
        }else{
            var tmp = Ud(new Exp(Math.log10(112) + (i - 18) * Math.log10(2), 1));
            if(Isbig(X,tmp)){
                return "1" + nname[i] + "<sup>" + Textj(Log(X,tmp),pow_l + 1) + "</sup>";
            }
        }
    }
}
function Textg(X){
    if(X.num == -Infinity){
	    return "0";
    }
    for(var i = mass_name.length - 1;i >= 0;i--){
        if(Isbig(X,mass_val[i])){
            if(i == mass_name.length - 1){
                var tmp = Log(X,mass_val[i]);
                tmp = Floor(Log(tmp,new Exp(15,0)));
                return Textf(Log(X,Pow(mass_val[i],Pow(new Exp(15,0),tmp)))) + mass_name[i] + Textf(tmp);
            }
            else if(i >= 8){
                return Textf(Log(X,mass_val[i])) + mass_name[i];
            }else{
                return Textf(Div(X,mass_val[i])) + mass_name[i];
            }
        }
    }
    return "0";
}