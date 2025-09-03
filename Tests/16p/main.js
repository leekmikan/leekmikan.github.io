const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let ci = 4;
let isclear = false;
let time = 0;
let field =
[
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
];
const image = new Image();
image.src = 'image.jpg'; // 描画する画像のパス
function sk(color,w,x,y,x2,y2){
    ctx.strokeStyle = color;
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
function onClick(e){
    if(isclear) return;
    const rect = e.target.getBoundingClientRect();    
    const viewX = e.clientX - rect.left,
          viewY = e.clientY - rect.top;      
    const scaleWidth =  canvas.clientWidth / canvas.width,
          scaleHeight =  canvas.clientHeight / canvas.height;      
    const x = Math.floor( viewX / scaleWidth ),
          y = Math.floor( viewY / scaleHeight );       
    cell = [0,0];
    cell[0] = Math.floor(field[0].length * x / canvas.width);
    cell[1] = Math.floor(field.length * y / canvas.height);
    changeCell(cell[0],cell[1]);
    draw();
}
function changeCell(x,y){
    for(let i = -1;i <= 1;i++){
        for(let j = -1;j <= 1;j++){
            if(x + j >= 0 && x + j < field[0].length && y + i >= 0 && y + i < field.length && i * j == 0){
                field[y + i][x + j] = (field[y + i][x + j] + 1) % ci;
            }
        }
    }
}
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0;i < field.length;i++){
        for(let j = 0;j < field[0].length;j++){
            let x = j;
            let y = i;
            if(field[i][j] != 0){
                while(x == j && y == i){
                    x = Math.floor(Math.random() * field[0].length);
                    y = Math.floor(Math.random() * field.length);
                }
            }
            ctx.drawImage(image, image.width * x / field[0].length, image.height * y / field.length, image.width / field[0].length, image.height / field.length, canvas.width * j / field[0].length, canvas.height * i / field.length, canvas.width / field[0].length, canvas.height / field.length);
        }
    }
    for(let i = 0;i < field[0].length + 1;i++){
        sk('black',1,i * canvas.width / field[0].length,0,i * canvas.width / field[0].length,canvas.height);
    }
    for(let i = 0;i < field.length + 1;i++){
        sk('black',1,0,i * canvas.height / field.length,canvas.width,i * canvas.height / field.length);
    }
    let sum = 0;
    for(let i = 0;i < field.length;i++){
        for(let j = 0;j < field[0].length;j++){
            sum += field[i][j];
        }
    }
    if(sum == 0){
        isclear = true;
        alert("クリア!");
    }
}
canvas.addEventListener('click', onClick, false);
image.onload = function() {
    for(let i = 0;i < 500;i++){
        let rnd = [Math.floor(Math.random() * field[0].length),Math.floor(Math.random() * field.length)];
        changeCell(rnd[0],rnd[1]);
    }
    draw();
}
setInterval(function(){
    if(!isclear){
        time += 0.1;
        document.getElementById("time").innerText = (Math.floor(time * 10) / 10).toFixed(1);
    }
}, 100);