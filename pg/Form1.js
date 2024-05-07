class Form1 extends Forms{
    constructor(args){
        super();
        this.Location.X = 100;
        this.Location.Y = 200;
        this.ControlBox = false;
        this.Text = "ウイルスだぞっ";
	
	    this.p1 = new Image();
	    this.p1.Size.Width = 40;
	    this.p1.Size.Height = 40;
	    this.p1.Location.X = 100;
        this.p1.Location.Y = 105;
	    this.p1.BackgroundImage = "img/err.png";
				
        this.t1 = new Label();
        this.t1.Location.X = 150;
        this.t1.Location.Y = 100;
        this.t1.Text = "じゃましてやるっ！";

        this.bt1 = new Button();
        this.bt1.Location.X = 160;
        this.bt1.Location.Y = 220;
        this.bt1.Text = "　やだ　";
        this.bt1.onclick = args + ".Close();";
    }
    init(){
        this.Add_Object(this.t1); //3つともForms.Show();が実行される.
        this.Add_Object(this.bt1);
        this.Add_Object(this.p1);
    }
}
var fs = Array(100);
for(var i = 0;i < 100;i++){
	fs[i] = new Form1("fs[" + i + "]");
	fs[i].Location.X = Math.floor(Math.random() * (window.innerWidth - 400));
	fs[i].Location.Y = Math.floor(Math.random() * window.innerHeight);
	fs[i].init();
}
