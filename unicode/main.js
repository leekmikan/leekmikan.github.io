const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const COLS = 6;
const ROWS = 12;
const BLOCK_SIZE = 32;
let board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

let falling = {
  x: 2,
  y: 0,
  color: make_char()
};
ctx.fillStyle = "#fff";
ctx.strokeStyle = "#fff";
const font_size = 16;
ctx.font = font_size + "px serif";
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw board
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (board[y][x] !== null) {
        ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        ctx.fillText(board[y][x],x * BLOCK_SIZE + BLOCK_SIZE / 8 + board[y][x].length * font_size / 32, y * BLOCK_SIZE + (BLOCK_SIZE + font_size) / 2, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  }
  ctx.strokeRect(falling.x * BLOCK_SIZE, falling.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
  ctx.fillText(falling.color,falling.x * BLOCK_SIZE + BLOCK_SIZE / 8 + falling.color.length * font_size / 32, falling.y * BLOCK_SIZE + (BLOCK_SIZE + font_size) / 2, BLOCK_SIZE, BLOCK_SIZE);
}

function canMove(dx, dy) {
  const nx = falling.x + dx;
  const ny = falling.y + dy;
  return nx >= 0 && nx < COLS && ny < ROWS && (!board[ny] || !board[ny][nx]);
}
function nei(x,y){
    if(x >= 0 && x < COLS && y >= 0 && y < ROWS){
        return (board[y][x] === null) ? "null" : board[y][x]; 
    }
    return "null";
}
function placePuyo() {
  board[falling.y][falling.x] = falling.color;
  let nei_val = [nei(falling.x,falling.y + 1),nei(falling.x - 1,falling.y),nei(falling.x + 1,falling.y)];
  if(nei_val[0].length == 2){
    board[falling.y + 1][falling.x] = String.fromCharCode(parseInt(falling.color + nei_val, 16) + "");
    board[falling.y][falling.x] = null;
  }
  else if(nei_val[1].length == 2 && nei_val[2].length != 2){
    board[falling.y][falling.x] = String.fromCharCode(parseInt(nei_val + falling.color, 16) + "");
    board[falling.y][falling.x - 1] = null;
  }
  else if(nei_val[1].length != 2 && nei_val[2].length == 2){
    board[falling.y][falling.x + 1] = String.fromCharCode(parseInt(falling.color + nei_val, 16) + "");
    board[falling.y][falling.x] = null;
  }
  falling = {
    x: 2,
    y: 0,
    color: make_char()
  };
  if (board[falling.y][falling.x] !== null) {
    alert("ゲームオーバー！");
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  }
}

function update() {
  if (canMove(0, 1)) {
    falling.y++;
  } else {
    placePuyo();
  }
  draw();
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft" && canMove(-1, 0)) falling.x--;
  if (e.key === "ArrowRight" && canMove(1, 0)) falling.x++;
  if (e.key === "ArrowDown" && canMove(0, 1)) falling.y++;
  draw();
});
function make_char(){
    let rt = Math.floor(Math.random() * 256).toString(16).toUpperCase();
    if(rt.length == 1) rt = "0" + rt;
    return rt;
}
setInterval(update, 500);
