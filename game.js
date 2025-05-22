const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = 0;
let dx = 5;
let y = 0;
let dy = 1;
let score = 0;
let gamerunning = true;
let Z = 10;
//this is an object
//we access values in an object like this:
//player x
const player = {
//key:value pair
x:0,
y:0,
color: 'lavender',
speed: 3
};
const keys = {};

//define functions

function drawPlayer(){
ctx.fillStyle=player.color;ctx.beginPath();
ctx.arc(
player.x,
player.y,
Z,
0,
2*Math.PI
);
ctx.fill();
}

function movePlayer(){
//player.x=player.x + player.speed;
//player.x +=player.speed;
if(keys['ArrowDown']){
player.y +=player.speed;
}
if(keys['ArrowDown']){
player.y +=player.speed;
}

if(keys['ArrowUp']){
player.y -=player.speed;
}
if(keys['ArrowLeft'] &&
player.x > 30){
player.x -=player.speed;
}
if(keys['ArrowRight'] &&
player.x < 1000){
player.x +=player.speed;
}
if(player.y < 0){
player.y=400;
}
if(player.y > 600){
player.y = 0;}
if(keys['ArrowUp']){
player.y -=player.speed;
}
if(keys['ArrowLeft'] &&
player.x > 30){
player.x -=player.speed;
}
if(keys['ArrowRight'] &&
player.x < 1000){
player.x +=player.speed;
}
if(keys['w']){
ctx.clearRect(0,0,1000,600);
}

//TODO: what if the player goes off fscvreen??

if(player.y < 0){
player.y=600;
}

if(keys['h']){
player.color= 'blue';
}
if(keys['a']){
player.color= 'lavender';
}
if(keys['b']){
player.color= 'green';
}
if(keys['c']){
player.color= 'red';
}
if(keys['d']){
player.color= 'orange';
}
if(keys['e']){
player.color= 'yellow';
}
if(keys['f']){
player.color= 'pink';
}
if(keys['g']){
player.color= 'white';
}
if(keys['i']){
Z =+1;
} 
if(keys['j']){
Z =+10;}
if(keys['k']){
Z =+20;}
if(keys['l']){
Z =+30;}
if(keys['z']){
Z =+30;}
if(keys['x']){
Z +=10;}
if(player.y > 600){
player.y = 0;
}
if(keys['m']){
Z =+50;}
if(keys['n']){
player.color= 'brown';
}
if(keys['o']){
player.color= 'black';
}
}
function drawScore(){
ctx.font = "10px Arial";
ctx.fillText(Math.floor(score/60), 10,10);
}
function checkCollision(){
//does player touch box? We'll check with AABB

//first, make helper variables


let box_min_x = x
let box_min_y = y
let box_max_y = y + 50
let box_max_x = x + 50
let player_min_x = player.x - 20;
let player_min_y = player.y - 20;
let player_max_y =player.y + 20;
let player_max_x =player.x + 20;

}

function game() {
if (gamerunning){
score++;

//game over??
//game start = what part are we in?
x = x + dx;
y = y + dx;
//y = y + 1;
drawScore();
drawPlayer();
movePlayer();
checkCollision();
}

if (x > 1000){
//x = x - 100;
dx = dx * -1;
}
if (x < 1){
//x = x - 10;
dx = dx * -1;
}
if (y > 600){
dy = dy * -1;
}
if (y < 0){
dy = dy * -1;
}


    requestAnimationFrame(game);
}

function handleKeyPress(e){

//console.log(e.key);
keys[e.key] = true;
}
//2 inputs: Event type and function to call
document.addEventListener('keydown', handleKeyPress);
document.addEventListener('keyup', (e) => {
  // console.log(e.key + " up");
keys[e.key] = false
});
//call our function
game();

