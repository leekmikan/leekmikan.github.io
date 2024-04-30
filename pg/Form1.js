class Form1 extends Forms{
    constructor(){
        super();
        this.Location.X = 100;
        this.Location.Y = 200;
        this.Text = "タイトル";
        this.t1 = new Label();
        this.t1.Location.X = 170;
        this.t1.Location.Y = 100;
        this.t1.Text = "あああ";

        this.bt1 = new Button();
        this.bt1.Location.X = 100;
        this.bt1.Location.Y = 220;
        this.bt1.Text = "はい";
        this.bt1.onclick = "alert('はい');f1.Close();";

        this.bt2 = new Button();
        this.bt2.Location.X = 250;
        this.bt2.Location.Y = 220;
        this.bt2.Text = "いいえ";
        this.bt2.onclick = "alert('いいえ');f1.Close();";
    }
    static init(){
        this.id = Forms.ID;
        Forms.ID++;
    }
}
var f1 = new Form1();
Form1.init();
f1.Show();
f1.Add_Object(f1.t1);
f1.Add_Object(f1.bt1);
f1.Add_Object(f1.bt2);
