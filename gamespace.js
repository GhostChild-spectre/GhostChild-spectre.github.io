// ========== Game Constants ==========
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

let WIDTH = canvas.width;
let HEIGHT = canvas.height;

// Responsive resize for mobile
function resizeCanvas() {
  if(window.innerWidth < 600) {
    canvas.width = window.innerWidth;
    canvas.height = Math.round(window.innerWidth * 1.5);
    WIDTH = canvas.width;
    HEIGHT = canvas.height;
  } else {
    canvas.width = 400;
    canvas.height = 600;
    WIDTH = 400;
    HEIGHT = 600;
  }
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ========== Level Data ==========
const LEVELS = [
  { enemyRows: 3, enemyCols: 6, enemySpeed: 1.2, enemyFireChance: 0.008 },
  { enemyRows: 4, enemyCols: 7, enemySpeed: 1.5, enemyFireChance: 0.010 },
  { enemyRows: 5, enemyCols: 8, enemySpeed: 1.8, enemyFireChance: 0.012 },
  { enemyRows: 6, enemyCols: 9, enemySpeed: 2.2, enemyFireChance: 0.016 }
];
const MAX_LEVEL = LEVELS.length;

// ========== Game State ==========
let leftPressed = false;
let rightPressed = false;
let shootPressed = false;
let canShoot = true;
let gameOver = false;
let score = 0;
let level = 1;
let state = "playing"; // "playing", "levelup", "gameover", "winall"

// Player
const player = {
  w: 40,
  h: 20,
  x: WIDTH/2 - 20,
  y: HEIGHT - 40,
  speed: 6
};

// Bullets
let bullets = [];
const bulletSpeed = 8;

// Enemies
let enemies = [];
let enemyDir = 1; // 1 = right, -1 = left
let enemySpeed = 1.2;
let enemyLastMove = 0;
const enemyMoveInterval = 32;
let enemyFireChance = 0.008;

// Enemy Bullets
let enemyBullets = [];
const enemyBulletSpeed = 4;

// ========== Controls ==========
// Keyboard
document.addEventListener('keydown', (e) => {
  if(e.code === 'ArrowLeft') leftPressed = true;
  if(e.code === 'ArrowRight') rightPressed = true;
  if(e.code === 'Space') shootPressed = true;
});
document.addEventListener('keyup', (e) => {
  if(e.code === 'ArrowLeft') leftPressed = false;
  if(e.code === 'ArrowRight') rightPressed = false;
  if(e.code === 'Space') shootPressed = false;
});

// Mobile
const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');
const shootBtn = document.getElementById('shoot-btn');

function mobileDown(which) {
  if(which === 'left') leftPressed = true;
  if(which === 'right') rightPressed = true;
  if(which === 'shoot') shootPressed = true;
}
function mobileUp(which) {
  if(which === 'left') leftPressed = false;
  if(which === 'right') rightPressed = false;
  if(which === 'shoot') shootPressed = false;
}
if(leftBtn && rightBtn && shootBtn) {
  leftBtn.addEventListener('touchstart', e => {e.preventDefault(); mobileDown('left');});
  leftBtn.addEventListener('touchend', e => {e.preventDefault(); mobileUp('left');});
  rightBtn.addEventListener('touchstart', e => {e.preventDefault(); mobileDown('right');});
  rightBtn.addEventListener('touchend', e => {e.preventDefault(); mobileUp('right');});
  shootBtn.addEventListener('touchstart', e => {e.preventDefault(); mobileDown('shoot');});
  shootBtn.addEventListener('touchend', e => {e.preventDefault(); mobileUp('shoot');});
}

// ========== Game Functions ==========
function setupLevel(lvl) {
  const data = LEVELS[lvl - 1];

  // Set enemy config for current level
  const enemyRows = data.enemyRows;
  const enemyCols = data.enemyCols;
  enemySpeed = data.enemySpeed;
  enemyFireChance = data.enemyFireChance;

  // Spawn enemies
  enemies = [];
  const enemySpacingX = (WIDTH - 80) / (enemyCols - 1);
  const enemySpacingY = 36;

  for(let row=0; row<enemyRows; row++) {
    for(let col=0; col<enemyCols; col++) {
      enemies.push({
        x: 40 + col*enemySpacingX,
        y: 60 + row*enemySpacingY,
        w: 28,
        h: 20,
        alive: true,
        row: row,
        col: col
      });
    }
  }
  enemyDir = 1;
}

function resetGame(toLevel = 1) {
  player.x = WIDTH/2 - player.w/2;
  bullets = [];
  enemyBullets = [];
  score = 0;
  gameOver = false;
  canShoot = true;
  level = toLevel;
  setupLevel(level);
  state = "playing";
}

function nextLevel() {
  level++;
  if (level > MAX_LEVEL) {
    state = "winall";
  } else {
    setupLevel(level);
    canShoot = true;
    bullets = [];
    enemyBullets = [];
    state = "playing";
  }
}

// Clear event listeners to avoid stacking
function clearCanvasAndEvents() {
  canvas.onclick = null;
  document.onkeydown = null;
}

function handleGameOver() {
  state = "gameover";
  clearCanvasAndEvents();
  document.onkeydown = (e) => {
    if(e.code === 'Space') { resetGame(1); clearCanvasAndEvents(); }
  };
  canvas.onclick = () => { resetGame(1); clearCanvasAndEvents(); };
}

function handleWinAll() {
  state = "winall";
  clearCanvasAndEvents();
  document.onkeydown = (e) => {
    if(e.code === 'Space') { resetGame(1); clearCanvasAndEvents(); }
  };
  canvas.onclick = () => { resetGame(1); clearCanvasAndEvents(); };
}

function handleLevelUp() {
  state = "levelup";
  clearCanvasAndEvents();
  document.onkeydown = (e) => {
    if(e.code === 'Space') { nextLevel(); clearCanvasAndEvents(); }
  };
  canvas.onclick = () => { nextLevel(); clearCanvasAndEvents(); };
}

// ========== Game Loop ==========
function gameLoop(ts) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // Draw player
  ctx.fillStyle = '#0f0';
  ctx.fillRect(player.x, player.y, player.w, player.h);
  ctx.fillStyle = '#fff';
  ctx.fillRect(player.x + player.w/2-4, player.y-6, 8, 6); // Cannon tip

  // Draw score and level
  ctx.font = "20px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText(`Score: ${score}`, 16, 32);
  ctx.fillText(`Level: ${level}`, WIDTH - 110, 32);

  if (state === "playing") {
    // Player movement
    if(leftPressed) player.x -= player.speed;
    if(rightPressed) player.x += player.speed;
    player.x = Math.max(0, Math.min(WIDTH - player.w, player.x));

    // Shooting
    if(shootPressed && canShoot) {
      bullets.push({x: player.x + player.w/2 - 3, y: player.y-10, w: 6, h: 12});
      canShoot = false;
      setTimeout(()=>{canShoot = true;}, 250);
    }
    if(!shootPressed) canShoot = true;

    // Draw & move bullets
    ctx.fillStyle = '#ff0';
    bullets.forEach((b, i) => {
      b.y -= bulletSpeed;
      ctx.fillRect(b.x, b.y, b.w, b.h);
      if(b.y < -b.h) bullets.splice(i, 1);
    });

    // Draw & move enemies
    let moveDown = false;
    if(ts - enemyLastMove > enemyMoveInterval) {
      let aliveEnemies = enemies.filter(e=>e.alive);
      if (aliveEnemies.length) {
        let leftMost = Math.min(...aliveEnemies.map(e=>e.x));
        let rightMost = Math.max(...aliveEnemies.map(e=>e.x+e.w));
        if(enemyDir === 1 && rightMost+enemySpeed > WIDTH-8) moveDown = true;
        if(enemyDir === -1 && leftMost-enemySpeed < 8) moveDown = true;
        aliveEnemies.forEach(e=>{
          if(moveDown) e.y += 18;
          else e.x += enemySpeed*enemyDir;
        });
        if(moveDown) enemyDir *= -1;
      }
      enemyLastMove = ts;
    }

    enemies.forEach(e => {
      if(!e.alive) return;
      ctx.fillStyle = '#09f';
      ctx.fillRect(e.x, e.y, e.w, e.h);
      ctx.fillStyle = '#fff';
      ctx.fillRect(e.x+6, e.y+6, 4, 4);
      ctx.fillRect(e.x+e.w-10, e.y+6, 4, 4);
    });

    // Collisions: bullet with enemy
    for (let bi = bullets.length - 1; bi >= 0; bi--) {
      let b = bullets[bi];
      for (let ei = 0; ei < enemies.length; ei++) {
        let e = enemies[ei];
        if (!e.alive) continue;
        if(b.x < e.x+e.w && b.x+b.w > e.x && b.y < e.y+e.h && b.y+b.h > e.y) {
          e.alive = false;
          bullets.splice(bi, 1);
          score += 10;
          enemySpeed += 0.03;
          break;
        }
      }
    }

    // Enemy shooting
    if(Math.random() < enemyFireChance) {
      let bottomEnemies = {};
      enemies.forEach(e=>{
        if(e.alive) {
          if(!bottomEnemies[e.col] || e.y > bottomEnemies[e.col].y) {
            bottomEnemies[e.col] = e;
          }
        }
      });
      let bottoms = Object.values(bottomEnemies);
      if(bottoms.length) {
        let shooter = bottoms[Math.floor(Math.random()*bottoms.length)];
        enemyBullets.push({x: shooter.x+shooter.w/2-2, y: shooter.y+shooter.h, w:4, h:12});
      }
    }

    // Draw & move enemy bullets
    ctx.fillStyle = '#f44';
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
      let eb = enemyBullets[i];
      eb.y += enemyBulletSpeed;
      ctx.fillRect(eb.x, eb.y, eb.w, eb.h);
      if(eb.y > HEIGHT) enemyBullets.splice(i, 1);
      if(eb.x < player.x+player.w && eb.x+eb.w > player.x && eb.y < player.y+player.h && eb.y+eb.h > player.y) {
        handleGameOver();
        return requestAnimationFrame(gameLoop);
      }
    }

    // Collide enemy with player
    for (let i = 0; i < enemies.length; i++) {
      let e = enemies[i];
      if(e.alive && e.y+e.h > player.y) {
        handleGameOver();
        return requestAnimationFrame(gameLoop);
      }
    }

    // Level up or win
    if(enemies.every(e=>!e.alive)) {
      if(level < MAX_LEVEL) {
        handleLevelUp();
      } else {
        handleWinAll();
      }
      return requestAnimationFrame(gameLoop);
    }

  } else if (state === "levelup") {
    ctx.font = "32px Arial";
    ctx.fillStyle = "#0f0";
    ctx.fillText("Level Complete!", WIDTH/2-110, HEIGHT/2-10);
    ctx.font = "18px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Press Space or Tap to Continue", WIDTH/2-120, HEIGHT/2+28);

  } else if (state === "winall") {
    ctx.font = "32px Arial";
    ctx.fillStyle = "#0f0";
    ctx.fillText("You Win All Levels!", WIDTH/2-130, HEIGHT/2);
    ctx.font = "18px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Tap or press Space to restart", WIDTH/2-110, HEIGHT/2+28);

  } else if (state === "gameover") {
    ctx.font = "32px Arial";
    ctx.fillStyle = "#f00";
    ctx.fillText("Game Over", WIDTH/2-90, HEIGHT/2-10);
    ctx.font = "18px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Tap or press Space to restart", WIDTH/2-110, HEIGHT/2+28);
  }

  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
