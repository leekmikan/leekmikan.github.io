class Form1 extends Forms{
    constructor(){
        super();
        this.Location.X = window.innerWidth / 2 - this.Size.Width / 2;
        this.Location.Y = window.scrollY + window.innerHeight / 2 - this.Size.Height / 2;
        this.Text = "確認";
        this.t1 = new Label();
        this.t1.Location.X = 150;
        this.t1.Location.Y = 100;
        this.BackColor = "#E0FFE0";
        this.t1.Text = "みえるかな？";

        this.bt1 = new Button();
        this.bt1.Location.X = 100;
        this.bt1.Location.Y = 220;
        this.bt1.Text = "はい";
        this.bt1.onclick = "f1.Close();";

        this.bt2 = new Button();
        this.bt2.Location.X = 250;
        this.bt2.Location.Y = 220;
        this.bt2.Text = "いいえ";
        this.bt2.onclick = "alert('嘘つき...');f1.Close();";
    }
    init(){
        this.Add_Object(this.t1); //3つともForms.Show();が実行される.
        this.Add_Object(this.bt1);
        this.Add_Object(this.bt2);
    }
}

var f1;
function conf(){ 
    f1 = new Form1();
    f1.init();
}

/*
class Form2 extends Forms{
    constructor(args){
        super(); //絶対必要
        this.Location.X = 100;
        this.Location.Y = 200 + window.scrollY;
        this.ControlBox = false; //×ボタン削除
        this.Text = "ウイルスだぞっ";
	
		this.p1 = new Image(); //画像
		this.p1.Size.Width = 40;
		this.p1.Size.Height = 40;
		this.p1.Location.X = 100;
    	this.p1.Location.Y = 105;
		this.p1.BackgroundImage = "enemy0.jpg"; //任意の画像を用意する(エラー時のマークなど)
				
        this.t1 = new Label(); //ラベル
        this.t1.Location.X = 150;
        this.t1.Location.Y = 100;
        this.t1.Text = "じゃましてやるっ！";

        this.bt1 = new Button(); //ボタン
        this.bt1.Location.X = 160;
        this.bt1.Location.Y = 220;
        this.bt1.Text = "　やだ　";
        this.bt1.onclick = args + ".Close();"; //ここで引数をつかう(閉じるため)
    }
    init(){
        this.Add_Object(this.t1); //初回だけForms.Show();が実行される.
        this.Add_Object(this.bt1);
        this.Add_Object(this.p1);
    }
}
var fs2;
function vis(){
    fs2 = Array(10);
    //10個ランダムに配置
    for(var i = 0;i < 10;i++){
    	fs2[i] = new Form2("fs[" + i + "]");
    	fs2[i].Location.X = Math.floor(Math.random() * window.innerWidth);
    	fs2[i].Location.Y = Math.floor(Math.random() * window.innerHeight);
    	fs2[i].init(); //配置 (空のフォームであれば fs[i].Show())
    }
}
*/
