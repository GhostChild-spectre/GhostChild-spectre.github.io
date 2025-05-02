const canvas =
document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "blue";
ctx.fillRect(0,0,400,400);

ctx.fillStyle = 'blue';
ctx.fillRect(0,300,400,100);
function triangle(x, y, r){
    ctx.beginPath();
    ctx.moveTo(75, 10);
    ctx.lineTo(20, 90);
    ctx.lineTo(130, 90);
    ctx.closePath();
    ctx.stroke(); // or ctx.fill();;
ctx.fill();
}
   triangle(ctx, 100, 50, 80);
triangle(ctx, 120, 70, 100);
triangle(ctx, 140, 90, 120);
