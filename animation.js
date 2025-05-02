const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = 0;
let dx = 5;
let y = 0;
let dy = 1;
let score = 0;
let gamerunning = true;

//this is an object
//we access values in an object like this:
//player x
const player = {
//key:value pair
x:0,
y:0,
color: 'green',
speed: 3
};
//this is also an object
//we access values from this kind of object like this: keys ['ArrowUp']
//or use whatever key it is!

const keys = {};

//define functions
function drawRect(x,y) {
    console.log("drawing rect");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(x,y,50,50);
    ctx.fill();
}

function drawPlayer(){
ctx.fillStyle=player.color;
ctx.beginPath();
ctx.arc(
player.x,
player.y,
20,
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
player.x < 370){
player.x +=player.speed;
}
//TODO: what if the player goes off fscvreen??

if(player.y < 0){
player.y=400;
}
if(player.y > 400){
player.y = 0;
if(keys['ArrowUp']){
player.y -=player.speed;
}
if(keys['ArrowLeft'] &&
player.x > 30){
player.x -=player.speed;
}
if(keys['ArrowRight'] &&
player.x < 370){
player.x +=player.speed;
}
//TODO: what if the player goes off fscvreen??

if(player.y < 0){
player.y=400;
}
if(player.y > 400){
player.y = 0;
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

function animate() { 
if (gamerunning){
score++;
  
//game over??
//game start = what part are we in?
x = x + dx;
y = y + dx;
//y = y + 1;
drawRect(x,y);
drawScore();
drawPlayer();
movePlayer();
checkCollision();
}

//TODO what happens if the player goes off the svreen edge?
    // TODO: Add some code here 
    //  that will change the rectangle's position
if (x > 350){
//x = x - 100;
dx = dx * -1;
}
if (x < 1){
//x = x - 10;
dx = dx * -1;
}
if (y > 350){
dy = dy * -1;
}
if (y < 0){
dy = dy * -1;
}


    requestAnimationFrame(animate);
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
animate();

