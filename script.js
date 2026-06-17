
let board = ["","","","","","","","",""];
let gameOver = false;

// mode
let mode = "pvc";

// turn for PVP
let turn = "x";

// SCORES (separated properly)
let humanScore = 0;
let computerScore = 0;
let p2HumanScore = 0;

// UI elements
const msg = document.getElementById("msg");
const blocks = document.getElementsByClassName("block");

// player data
let p1name = "Player 1";
let p2name = "Player 2";
let p1emoji = "🦁";
let p2emoji = "🐯";

// ================= MODE CHANGE =================
function setMode(){
mode = document.getElementById("gameMode").value;

// reset everything properly
humanScore = 0;
computerScore = 0;
p2HumanScore = 0;

updatePlayers();
resetGame();
turn = "x";
}

// ================= READ UI =================
function updatePlayers(){

p1name = document.getElementById("p1name").value || "Player 1";
p2name = document.getElementById("p2name").value || "Player 2";

p1emoji = document.getElementById("p1emoji").value;
p2emoji = document.getElementById("p2emoji").value;

updateScore();
}

// ================= MAIN PLAY =================
function play(i){

if(board[i] !== "" || gameOver) return;

// HUMAN MOVE
if(mode === "pvc"){
board[i] = "x";
blocks[i].innerHTML = p1emoji;
}
else{
board[i] = turn;
blocks[i].innerHTML = (turn === "x") ? p1emoji : p2emoji;
}

let win = checkWinner();

if(win){
handleWin(win);
return;
}

if(!board.includes("")){
msg.innerHTML = "🤝 Draw";
gameOver = true;
return;
}

// MODE SWITCH
if(mode === "pvc"){
msg.innerHTML = `${p2emoji} Thinking...`;
setTimeout(computerMove, 500);
}
else{
togglePlayer();
}
}

// ================= HUMAN VS HUMAN TURN =================
function togglePlayer(){

turn = (turn === "x") ? "o" : "x";

msg.innerHTML =
(turn === "x")
? `${p1emoji} ${p1name} Turn`
: `${p2emoji} ${p2name} Turn`;
}

// ================= COMPUTER MOVE =================
function computerMove(){

if(gameOver || mode !== "pvc") return;

let empty = [];

for(let i=0;i<9;i++){
if(board[i] === "") empty.push(i);
}

let move = empty[Math.floor(Math.random() * empty.length)];

board[move] = "o";
blocks[move].innerHTML = p2emoji;

let win = checkWinner();

if(win){
handleWin(win);
return;
}

if(!board.includes("")){
msg.innerHTML = "🤝 Draw";
gameOver = true;
return;
}

msg.innerHTML = `${p1emoji} Your Turn`;
}

// ================= WIN HANDLER =================
function handleWin(win){

win.forEach(i=>{
blocks[i].style.boxShadow = "0 0 20px gold";
});

let winner = board[win[0]];

// SCORE LOGIC FIXED
if(mode === "pvc"){
if(winner === "x") humanScore++;
else computerScore++;
}
else{
if(winner === "x") humanScore++;
else p2HumanScore++;
}

updateScore();

// MESSAGE
msg.innerHTML =
(winner === "x")
? `🏆 ${p1emoji} ${p1name} Wins!`
: `🏆 ${p2emoji} ${p2name} Wins!`;

gameOver = true;
}

// ================= WIN CHECK =================
function checkWinner(){

let patterns = [
[0,1,2],[3,4,5],[6,7,8],
[0,3,6],[1,4,7],[2,5,8],
[0,4,8],[2,4,6]
];

for(let p of patterns){
let [a,b,c] = p;

if(board[a] && board[a] === board[b] && board[a] === board[c]){
return p;
}
}
return null;
}

// ================= SCOREBOARD =================
function updateScore(){

if(mode === "pvc"){
document.getElementById("scoreboard").innerHTML =
`${p1emoji} ${p1name} ${humanScore} : ${computerScore} 🤖 Computer`;
}
else{
document.getElementById("scoreboard").innerHTML =
`${p1emoji} ${p1name} ${humanScore} : ${p2HumanScore} ${p2emoji} ${p2name}`;
}

}

// ================= RESET =================
function resetGame(){

board = ["","","","","","","","",""];
gameOver = false;
turn = "x";

for(let i=0;i<9;i++){
blocks[i].innerHTML = "";
blocks[i].style.boxShadow = "";
}

updatePlayers();

msg.innerHTML = `${p1emoji} ${p1name} Turn`;
}