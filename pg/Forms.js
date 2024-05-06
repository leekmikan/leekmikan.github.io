class Forms{
    static ID = 0;
    static active_ID = -1;
    constructor() {
        this.AllowDrop = false;
        this.BackColor = "#FFFFFF";
        this.BackgroundImage = "";
        this.ControlBox = true;
        this.font_family = "sans-serif";
        this.font_size = 16;
        this.ForeColor = "#000000";
        this.Location = {X : 0, Y : 0};
        this.Location_offset = {X : 0, Y : 0};
        this.Size = {Width : 400, Height : 300};
        this.Text = "Form";
        this.TopMost = false;
        this.id = -1;
    }
    Close(){
        if(!!document.getElementById("FormID:" + this.id)){
            document.getElementById("FormID:" + this.id).remove();
        }
    }
    Show() {
        this.Close();
        this.id = Forms.ID;
        Forms.ID++;
        var newElement = document.createElement("div");
        newElement.setAttribute("id","FormID:" + this.id);
        var tmp = "position:absolute;";
        tmp += "top:" + this.Location.Y + "px;left:" + this.Location.X + "px;";
        tmp += "width:" + this.Size.Width + "px;height:" + this.Size.Height + "px;";
        tmp += "background:" + this.BackColor + ";";
        tmp += "color:" + this.ForeColor + ";";
        if(this.BackgroundImage != ""){
            tmp += "background-image:url('" + this.BackgroundImage + "');background-size:cover;";
        } 
        newElement.setAttribute("style",tmp);
        document.body.insertBefore(newElement, null);
        newElement = document.createElement("p");
        var newContent = document.createTextNode(this.Text);
        newElement.appendChild(newContent);
        newElement.addEventListener('mousedown', event => {
            var tmp_f = document.getElementById("FormID:" + this.id);
            document.body.appendChild(tmp_f);
            Forms.active_ID = this.id;
            this.Location_offset.X = event.offsetX;
            this.Location_offset.Y = event.offsetY;
        });
        newElement.addEventListener('mouseup', event => {
            Forms.active_ID = -1;
            this.Location_offset.X = event.offsetX;
            this.Location_offset.Y = event.offsetY;
            this.Location.X = event.pageX;
            this.Location.Y = event.pageY;
        });
        newElement.addEventListener('mouseout', event => {
            if(Forms.active_ID == this.id){
                Forms.active_ID = -1;
                document.getElementById("FormID:" + this.id).style.left = (event.pageX - this.Location_offset.X) + "px";
                document.getElementById("FormID:" + this.id).style.top = (event.pageY - this.Location_offset.Y)+ "px";
                this.Location_offset.X = event.offsetX;
                this.Location_offset.Y = event.offsetY;
                this.Location.X = event.pageX;
                this.Location.Y = event.pageY;
            }
        });
        newElement.addEventListener('mousemove', event => {
            if(Forms.active_ID == this.id){
                document.getElementById("FormID:" + this.id).style.left = (event.pageX - this.Location_offset.X) + "px";
                document.getElementById("FormID:" + this.id).style.top = (event.pageY - this.Location_offset.Y)+ "px";
            }
        });
        newElement.setAttribute("class","form_title");
        var fm = document.getElementById("FormID:" + this.id);
        fm.insertBefore(newElement, null);

        newElement = document.createElement("button");
        newContent = document.createTextNode("X");
        newElement.appendChild(newContent);
        newElement.setAttribute("class","form_exit");
        newElement.addEventListener('click', event => {
            this.Close();
        });
        fm.insertBefore(newElement, null);
    }
    Load(func){
        document.getElementById("FormID:" + this.id).addEventListener('load',func);
    }
    Click(func){
        document.getElementById("FormID:" + this.id).addEventListener('click',func);
    }
    MouseDown(func){
        document.getElementById("FormID:" + this.id).addEventListener('mousedown',func);
    }
    MouseUp(func){
        document.getElementById("FormID:" + this.id).addEventListener('mouseup',func);
    }
    MouseOver(func){
        document.getElementById("FormID:" + this.id).addEventListener('mouseover',func);
    }
    MouseOut(func){
        document.getElementById("FormID:" + this.id).addEventListener('mouseout',func);
    }
    KeyDown(func){
        document.getElementById("FormID:" + this.id).addEventListener('keydown',func);
    }
    KeyUp(func){
        document.getElementById("FormID:" + this.id).addEventListener('keyup',func);
    }
    KeyPress(func){
        document.getElementById("FormID:" + this.id).addEventListener('keypress',func);
    }
    Add_Object(obj){
        if(!(!!document.getElementById("FormID:" + this.id))){
            this.Show();
        }
        var fm = document.getElementById("FormID:" + this.id);
        var newElement = document.createElement(obj.tag);
        var newContent = document.createTextNode(obj.Text);
        newElement.appendChild(newContent);
        var tmp = "position:absolute;";
        tmp += "top:" + obj.Location.Y + "px;left:" + obj.Location.X + "px;";
        if(obj.tag != "p" && obj.tag != "button"){
            tmp += "width:" + obj.Size.Width + "px;height:" + obj.Size.Height + "px;";
            tmp += "background:" + obj.BackColor + ";";
        }
        tmp += "color:" + obj.ForeColor + ";";
        newElement.setAttribute("style",tmp);
        if(obj.tag == "button"){
            newElement.setAttribute("onclick",obj.onclick);
        }
        fm.insertBefore(newElement, null);
    }
}
class Label{
    constructor(){
        this.tag = "p";
        this.Location = {X : 0,Y : 0};
        this.font_family = "sans-serif";
        this.font_size = 16;
        this.ForeColor = "#000000";
        this.BackColor = "#FFFFFF";
        this.Text = "";
    }
}
class Button{
    constructor(){
        this.tag = "button";
        this.Location = {X : 0,Y : 0};
        this.font_family = "sans-serif";
        this.font_size = 16;
        this.ForeColor = "#000000";
        this.BackColor = "#FFFFFF";
        this.Text = "";
        this.onclick = "";
    }
}