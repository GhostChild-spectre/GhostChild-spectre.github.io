const canvas = document.getElementById('gardenCanvas');
const ctx = canvas.getContext('2d');
const seedSelect = document.getElementById('seedSelect');
const plantBtn = document.getElementById('plantBtn');
const waterBtn = document.getElementById('waterBtn');
const harvestBtn = document.getElementById('harvestBtn');
const statusDiv = document.getElementById('status');
const waterSound = document.getElementById('waterSound');
const harvestSound = document.getElementById('harvestSound');

const PLANTS = {
    tulip: {
        name: "Tulip",
        color: "#ffb6d9",
        stages: 3,
        emoji: "🌷"
    },
    rose: {
        name: "Rose",
        color: "#e57385",
        stages: 3,
        emoji: "🌹"
    },
    sunflower: {
        name: "Sunflower",
        color: "#ffd700",
        stages: 3,
        emoji: "🌻"
    },
    cherryblossom: {
        name: "Cherry Blossom",
        color: "#ffe8f3",
        stages: 3,
        emoji: "🌸"
    },
    lily: {
        name: "Lily",
        color: "#f9f6ea",
        stages: 3,
        emoji: "🌺"
    },
    cactus: {
        name: "Cactus",
        color: "#5ebd5e",
        stages: 3,
        emoji: "🌵"
    },
    buns: {
        name: "Bunny Ear Cactus",
        color: "#e9f5b8",
        stages: 3,
        emoji: "🐰"
    },
    tree: {
        name: "Little Tree",
        color: "#8fd18f",
        stages: 3,
        emoji: "🌳"
    },
    daisy: {
        name: "Daisy",
        color: "#fffbea",
        stages: 3,
        emoji: "🌼"
    },
    bluebell: {
        name: "Bluebell",
        color: "#9ecbfa",
        stages: 3,
        emoji: "🔔"
    },
    clover: {
        name: "Lucky Clover",
        color: "#a7e788",
        stages: 3,
        emoji: "☘️"
    },
    // 10 Extra Cute Plants
    peachblossom: {
        name: "Peach Blossom",
        color: "#ffd6e0",
        stages: 3,
        emoji: "🍑"
    },
    strawberry: {
        name: "Strawberry Plant",
        color: "#ff6f91",
        stages: 3,
        emoji: "🍓"
    },
    mint: {
        name: "Mint Sprout",
        color: "#b3ffd6",
        stages: 3,
        emoji: "🌱"
    },
    pansy: {
        name: "Pansy",
        color: "#a09cff",
        stages: 3,
        emoji: "💜"
    },
    hydrangea: {
        name: "Hydrangea",
        color: "#b9e1ff",
        stages: 3,
        emoji: "🩵"
    },
    forgetmenot: {
        name: "Forget-me-not",
        color: "#6db6ff",
        stages: 3,
        emoji: "🦋"
    },
    marigold: {
        name: "Marigold",
        color: "#ffbe5e",
        stages: 3,
        emoji: "🧡"
    },
    morningglory: {
        name: "Morning Glory",
        color: "#a3a9f4",
        stages: 3,
        emoji: "🔵"
    },
    pumpkin: {
        name: "Pumpkin Sprout",
        color: "#ffa95e",
        stages: 3,
        emoji: "🎃"
    },
    bunnybloom: {
        name: "Bunny-Bloom",
        color: "#fff2fa",
        stages: 3,
        emoji: "🐇"
    }
};

let plot = {
    planted: false,
    type: null,
    stage: 0,
    watered: false
};

function drawGarden() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw ground
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, 320);
    ctx.bezierCurveTo(50, 340, 350, 350, 420, 320);
    ctx.lineTo(420, 360);
    ctx.lineTo(0, 360);
    ctx.closePath();
    ctx.fillStyle = "#b6e2a1";
    ctx.fill();
    ctx.restore();

    // Draw sparkles and petals (anime style)
    for (let i = 0; i < 8; i++) {
        drawSparkle(
            40 + Math.random() * 320, 
            60 + Math.random() * 220, 
            6 + Math.random() * 7, 
            "rgba(255,255,255,0.7)"
        );
    }
    // Draw plot
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(210, 310, 55, 13, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#967d5e";
    ctx.shadowColor = "#977e6b";
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    // Draw sprout/plant
    if (plot.planted) {
        drawPlant(plot.type, plot.stage, plot.watered);
    }
}

function drawSparkle(x, y, size, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
        ctx.lineTo(0, size);
        ctx.translate(0, size);
        ctx.rotate((Math.PI * 2) / 10);
        ctx.lineTo(0, -size);
        ctx.translate(0, -size);
        ctx.rotate(-(Math.PI * 6) / 10);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.65;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
}

function drawPlant(type, stage, watered) {
    ctx.save();
    ctx.translate(210, 295);

    // Special cases for new super cute plants
    if (stage === 1) {
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, 2 * Math.PI);
        ctx.fillStyle = "#6bcd72";
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(-8, -7, 7, 3, -0.8, 0, Math.PI * 2);
        ctx.ellipse(8, -7, 7, 3, 0.8, 0, Math.PI * 2);
        ctx.fillStyle = "#8ee78b";
        ctx.globalAlpha = watered ? 1 : 0.7;
        ctx.fill();
    } else if (stage === 2) {
        if (type === "tree") {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -30);
            ctx.lineWidth = 10;
            ctx.strokeStyle = "#bd8e5a";
            ctx.lineCap = "round";
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, -38, 20, 0, 2 * Math.PI);
            ctx.fillStyle = "#b7e7b7";
            ctx.globalAlpha = watered ? 1 : 0.85;
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -35);
            ctx.lineWidth = 6;
            ctx.strokeStyle = "#5fa45b";
            ctx.lineCap = "round";
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(-13, -18, 12, 5, -0.8, 0, Math.PI * 2);
            ctx.ellipse(13, -20, 12, 5, 0.8, 0, Math.PI * 2);
            ctx.fillStyle = "#8ee78b";
            ctx.globalAlpha = watered ? 1 : 0.8;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(0, -37, 11, 0, 2 * Math.PI);
            ctx.fillStyle = PLANTS[type].color;
            ctx.globalAlpha = watered ? 1 : 0.8;
            ctx.fill();
        }
    } else if (stage === 3) {
        // FULL BLOOM
        if (type === "tree") {
            drawTree(ctx, 0, -45, PLANTS[type].color, watered);
            drawSparkle(0, -100, 15, "#fffbe7");
        } else if (type === "daisy") {
            drawDaisy(ctx, 0, -55, PLANTS[type].color, watered);
        } else if (type === "bluebell") {
            drawBluebell(ctx, 0, -55, PLANTS[type].color, watered);
        } else if (type === "clover") {
            drawClover(ctx, 0, -50, PLANTS[type].color, watered);
        } else if (type === "peachblossom") {
            drawPeachBlossom(ctx, 0, -55, PLANTS[type].color, watered);
        } else if (type === "strawberry") {
            drawStrawberry(ctx, 0, -52, PLANTS[type].color, watered);
        } else if (type === "mint") {
            drawMint(ctx, 0, -47, PLANTS[type].color, watered);
        } else if (type === "pansy") {
            drawPansy(ctx, 0, -55, PLANTS[type].color, watered);
        } else if (type === "hydrangea") {
            drawHydrangea(ctx, 0, -55, PLANTS[type].color, watered);
        } else if (type === "forgetmenot") {
            drawForgetMeNot(ctx, 0, -53, PLANTS[type].color, watered);
        } else if (type === "marigold") {
            drawMarigold(ctx, 0, -55, PLANTS[type].color, watered);
        } else if (type === "morningglory") {
            drawMorningGlory(ctx, 0, -55, PLANTS[type].color, watered);
        } else if (type === "pumpkin") {
            drawPumpkin(ctx, 0, -30, PLANTS[type].color, watered);
        } else if (type === "bunnybloom") {
            drawBunnyBloom(ctx, 0, -45, PLANTS[type].color, watered);
        } else {
            // Stem + leaves + anime classic flower
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -45);
            ctx.lineWidth = 7;
            ctx.strokeStyle = "#5fa45b";
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(-15, -22, 13, 5, -0.7, 0, Math.PI * 2);
            ctx.ellipse(15, -24, 13, 5, 0.7, 0, Math.PI * 2);
            ctx.fillStyle = "#8ee78b";
            ctx.globalAlpha = watered ? 1 : 0.9;
            ctx.fill();
            if (type === "tulip") {
                drawTulip(ctx, 0, -55, PLANTS[type].color);
            } else if (type === "rose") {
                drawRose(ctx, 0, -55, PLANTS[type].color);
            } else if (type === "sunflower") {
                drawSunflower(ctx, 0, -55, PLANTS[type].color);
            } else if (type === "cherryblossom") {
                drawCherryBlossom(ctx, 0, -55, PLANTS[type].color);
            } else if (type === "lily") {
                drawLily(ctx, 0, -55, PLANTS[type].color);
            } else if (type === "cactus") {
                drawCactus(ctx, 0, -45, PLANTS[type].color);
            } else if (type === "buns") {
                drawBuns(ctx, 0, -45, PLANTS[type].color);
            }
            drawSparkle(0, -75, 12, "#fffbe7");
        }
    }
    ctx.restore();
}

// --- Drawing functions for cute new plants ---

function drawPeachBlossom(ctx, x, y, color, watered) {
    ctx.save();
    ctx.translate(x, y);
    for (let i = 0; i < 5; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 / 5) * i);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.bezierCurveTo(10, -17, 22, -20, 0, -31);
        ctx.bezierCurveTo(-22, -20, -10, -17, 0, 0);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.globalAlpha = watered ? 1 : 0.85;
        ctx.fill();
        ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(0, 0, 7, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffa6b7";
    ctx.globalAlpha = 1;
    ctx.fill();
    ctx.restore();
}

function drawStrawberry(ctx, x, y, color, watered) {
    ctx.save();
    ctx.translate(x, y);
    // Body
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(18, 8, 18, 26, 0, 34);
    ctx.bezierCurveTo(-18, 26, -18, 8, 0, 0);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.globalAlpha = watered ? 1 : 0.9;
    ctx.fill();
    // Leaves
    for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 / 3) * i - 0.3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -13);
        ctx.lineTo(6, -11);
        ctx.lineTo(0, 0);
        ctx.fillStyle = "#8ee78b";
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.restore();
    }
    // Seeds
    for (let a = 0; a < 10; a++) {
        ctx.save();
        ctx.rotate(((Math.PI * 2) / 10) * a);
        ctx.beginPath();
        ctx.ellipse(0, 19, 1.2, 2.3, 0, 0, 2 * Math.PI);
        ctx.fillStyle = "#fffde6";
        ctx.globalAlpha = 0.9;
        ctx.fill();
        ctx.restore();
    }
    // Face
    ctx.beginPath();
    ctx.arc(-4, 16, 1.2, 0, 2 * Math.PI);
    ctx.arc(4, 16, 1.2, 0, 2 * Math.PI);
    ctx.fillStyle = "#833c36";
    ctx.fill();
    ctx.restore();
}

function drawMint(ctx, x, y, color, watered) {
    ctx.save();
    ctx.translate(x, y);
    for (let i = 0; i < 4; i++) {
        ctx.save();
        ctx.rotate(((Math.PI * 2) / 4) * i + 0.2);
        ctx.beginPath();
        ctx.ellipse(0, -14, 8, 18, 0, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.globalAlpha = watered ? 1 : 0.95;
        ctx.fill();
        ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "#c0ffe4";
    ctx.fill();
    ctx.restore();
}

function drawPansy(ctx, x, y, color, watered) {
    ctx.save();
    ctx.translate(x, y);
    // Three top petals
    for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 / 3) * i - 0.3);
        ctx.beginPath();
        ctx.ellipse(0, -13, 10, 18, 0, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.globalAlpha = watered ? 1 : 0.8;
        ctx.fill();
        ctx.restore();
    }
    // Two bottom petals
    for (let i = 0; i < 2; i++) {
        ctx.save();
        ctx.rotate((Math.PI / 2) * i - 0.6);
        ctx.beginPath();
        ctx.ellipse(0, 9, 10, 17, 0, 0, 2 * Math.PI);
        ctx.fillStyle = "#ffe9fc";
        ctx.globalAlpha = 0.7;
        ctx.fill();
        ctx.restore();
    }
    // Center
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, 2 * Math.PI);
    ctx.fillStyle = "#e1b6ff";
    ctx.fill();
    ctx.restore();
}

function drawHydrangea(ctx, x, y, color, watered) {
    ctx.save();
    ctx.translate(x, y);
    for (let i = 0; i < 8; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 / 8) * i);
        ctx.beginPath();
        ctx.arc(12, 0, 8, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.globalAlpha = watered ? 0.6 : 0.4;
        ctx.fill();
        ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(0, 0, 11, 0, 2 * Math.PI);
    ctx.fillStyle = "#e1f4ff";
    ctx.globalAlpha = 1;
    ctx.fill();
    ctx.restore();
}

function drawForgetMeNot(ctx, x, y, color, watered) {
    ctx.save();
    ctx.translate(x, y);
    for (let i = 0; i < 5; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 / 5) * i);
        ctx.beginPath();
        ctx.ellipse(0, -10, 6, 13, 0, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.globalAlpha = watered ? 1 : 0.7;
        ctx.fill();
        ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "#fffbe5";
    ctx.fill();
    ctx.restore();
}

function drawMarigold(ctx, x, y, color, watered) {
    ctx.save();
    ctx.translate(x, y);
    for (let i = 0; i < 12; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 / 12) * i);
        ctx.beginPath();
        ctx.ellipse(0, -13, 5, 15, 0, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.globalAlpha = watered ? 1 : 0.7;
        ctx.fill();
        ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(0, 0, 9, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff5c6";
    ctx.fill();
    ctx.restore();
}

function drawMorningGlory(ctx, x, y, color, watered) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.globalAlpha = watered ? 1 : 0.7;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    for (let i = 0; i < 5; i++) {
        ctx.lineTo( Math.cos((Math.PI*2/5)*i) * 18, Math.sin((Math.PI*2/5)*i) * 18 );
        ctx.lineTo(0, 0);
    }
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.7;
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff2f9";
    ctx.fill();
    ctx.restore();
}

function drawPumpkin(ctx, x, y, color, watered) {
    ctx.save();
    ctx.translate(x, y + 10);
    // Big pumpkin body
    ctx.beginPath();
    ctx.ellipse(0, 0, 18, 14, 0, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.globalAlpha = watered ? 1 : 0.8;
    ctx.fill();
    // Side lobes
    ctx.beginPath();
    ctx.ellipse(-10, 0, 7, 11, 0, 0, 2 * Math.PI);
    ctx.ellipse(10, 0, 7, 11, 0, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffd68f";
    ctx.globalAlpha = 0.7;
    ctx.fill();
    // Stem
    ctx.beginPath();
    ctx.moveTo(0, -12);
    ctx.bezierCurveTo(2, -16, 6, -22, 0, -20);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#9b7744";
    ctx.stroke();
    // Face
    ctx.beginPath();
    ctx.arc(-5, 3, 1.2, 0, 2 * Math.PI);
    ctx.arc(5, 3, 1.2, 0, 2 * Math.PI);
    ctx.fillStyle = "#7c5433";
    ctx.fill();
    ctx.restore();
}

function drawBunnyBloom(ctx, x, y, color, watered) {
    ctx.save();
    ctx.translate(x, y);
    // Giant cute bunny flower
    // Ears
    ctx.beginPath();
    ctx.ellipse(-6, -17, 5, 14, -0.25, 0, 2 * Math.PI);
    ctx.ellipse(6, -17, 5, 14, 0.25, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff8fb";
    ctx.globalAlpha = 0.95;
    ctx.fill();
    // Inner ear
    ctx.beginPath();
    ctx.ellipse(-6, -17, 2, 8, -0.25, 0, 2 * Math.PI);
    ctx.ellipse(6, -17, 2, 8, 0.25, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffd1e3";
    ctx.globalAlpha = 0.7;
    ctx.fill();
    // Head (flower)
    ctx.beginPath();
    ctx.ellipse(0, 0, 12, 10, 0, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.globalAlpha = watered ? 1 : 0.9;
    ctx.fill();
    // Eyes
    ctx.beginPath();
    ctx.arc(-3, -2, 1.2, 0, 2 * Math.PI);
    ctx.arc(3, -2, 1.2, 0, 2 * Math.PI);
    ctx.fillStyle = "#b288b8";
    ctx.globalAlpha = 0.8;
    ctx.fill();
    // Blush
    ctx.globalAlpha = 0.2;
    ctx.beginPath();
    ctx.ellipse(-4.6, 2, 2.3, 1.1, 0, 0, 2 * Math.PI);
    ctx.ellipse(4.6, 2, 2.3, 1.1, 0, 0, 2 * Math.PI);
    ctx.fillStyle = "#fdc6d4";
    ctx.fill();
    ctx.restore();
}

// --- End new plant drawing functions ---

// Existing drawing functions for originals and classics
function drawTulip(ctx, x, y, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(18, -23, 12, -45, 0, -35);
    ctx.bezierCurveTo(-12, -45, -18, -23, 0, 0);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.92;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.moveTo(-8, -18);
    ctx.bezierCurveTo(-18, -20, -13, -34, 0, -28);
    ctx.bezierCurveTo(13, -34, 18, -20, 8, -18);
    ctx.closePath();
    ctx.fillStyle = "#fff1f9";
    ctx.globalAlpha = 0.6;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
}

function drawRose(ctx, x, y, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.arc(0, 0, 17, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.91;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0.4 * Math.PI, 1.8 * Math.PI);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "#fff2f7";
    ctx.stroke();
    ctx.restore();
}

function drawSunflower(ctx, x, y, color) {
    ctx.save();
    ctx.translate(x, y);
    for (let i = 0; i < 12; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 / 12) * i);
        ctx.beginPath();
        ctx.ellipse(0, -14, 7, 15, 0, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.92;
        ctx.fill();
        ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "#a68458";
    ctx.globalAlpha = 1;
    ctx.fill();
    ctx.restore();
}

function drawCherryBlossom(ctx, x, y, color) {
    ctx.save();
    ctx.translate(x, y);
    for (let i = 0; i < 5; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 / 5) * i);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.bezierCurveTo(7, -16, 18, -16, 0, -28);
        ctx.bezierCurveTo(-18, -16, -7, -16, 0, 0);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.93;
        ctx.fill();
        ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "#f7b3d2";
    ctx.globalAlpha = 1;
    ctx.fill();
    ctx.restore();
}

function drawLily(ctx, x, y, color) {
    ctx.save();
    ctx.translate(x, y);
    for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 / 6) * i);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.bezierCurveTo(6, -20, 16, -22, 0, -38);
        ctx.bezierCurveTo(-16, -22, -6, -20, 0, 0);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.96;
        ctx.fill();
        ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, 2 * Math.PI);
    ctx.fillStyle = "#f1d6e3";
    ctx.globalAlpha = 1;
    ctx.fill();
    ctx.restore();
}

function drawCactus(ctx, x, y, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.ellipse(0, 0, 13, 28, 0, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.93;
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(-12, -8, 6, 14, 0.7, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(12, -10, 6, 14, -0.7, 0, 2 * Math.PI);
    ctx.fill();
    for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 / 6) * i);
        ctx.beginPath();
        ctx.moveTo(0, -18);
        ctx.lineTo(0, -22);
        ctx.strokeStyle = "#f2f2f2";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
    }
    ctx.restore();
}

function drawBuns(ctx, x, y, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.ellipse(-8, -24, 7, 20, -0.18, 0, 2 * Math.PI);
    ctx.ellipse(8, -24, 7, 20, 0.18, 0, 2 * Math.PI);
    ctx.fillStyle = "#fffbe7";
    ctx.globalAlpha = 0.93;
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(-8, -24, 3, 13, -0.18, 0, 2 * Math.PI);
    ctx.ellipse(8, -24, 3, 13, 0.18, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffd6e2";
    ctx.globalAlpha = 0.8;
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(0, 0, 16, 13, 0, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.97;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(-4, -4, 2, 0, 2 * Math.PI);
    ctx.arc(4, -4, 2, 0, 2 * Math.PI);
    ctx.fillStyle = "#222";
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.restore();
}

function drawTree(ctx, x, y, color, watered) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(0, 45);
    ctx.lineTo(0, 8);
    ctx.lineWidth = 13;
    ctx.strokeStyle = "#b88b57";
    ctx.lineCap = "round";
    ctx.shadowColor = "#b88b57";
    ctx.shadowBlur = 3;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.moveTo(0, 25);
    ctx.lineTo(-18, 5);
    ctx.lineWidth = 7;
    ctx.strokeStyle = "#b88b57";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 20);
    ctx.lineTo(18, 0);
    ctx.lineWidth = 7;
    ctx.strokeStyle = "#b88b57";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 35, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.shadowColor = "#aad9a3";
    ctx.shadowBlur = 10;
    ctx.globalAlpha = watered ? 1 : 0.85;
    ctx.fill();
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.arc(-12, -15, 18, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(-8, 10, 3, 0, 2 * Math.PI);
    ctx.arc(8, 10, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "#54482b";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 17, 6, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#a06a4d";
    ctx.stroke();
    ctx.restore();
}

function drawDaisy(ctx, x, y, color, watered) {
    ctx.save();
    ctx.translate(x, y);
    for (let i = 0; i < 10; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 / 10) * i);
        ctx.beginPath();
        ctx.ellipse(0, -14, 6, 14, 0, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = watered ? 1 : 0.85;
        ctx.fill();
        ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(0, 0, 7, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffe066";
    ctx.globalAlpha = 1;
    ctx.fill();
    ctx.restore();
}

function drawBluebell(ctx, x, y, color, watered) {
    ctx.save();
    ctx.translate(x, y);
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, 30);
    ctx.bezierCurveTo(-5, 15, -10, -10, 0, -12);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#84b3d1";
    ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.translate(0, -12);
    ctx.rotate(Math.PI * -0.07);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(8, 2, 8, 20, 0, 16);
    ctx.bezierCurveTo(-8, 20, -8, 2, 0, 0);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.globalAlpha = watered ? 1 : 0.75;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 16, 2, 0, 2 * Math.PI);
    ctx.fillStyle = "#d1e6fa";
    ctx.fill();
    ctx.restore();
    ctx.restore();
}

function drawClover(ctx, x, y, color, watered) {
    ctx.save();
    ctx.translate(x, y);
    for (let i = 0; i < 4; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 / 4) * i);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(6, -12, 20, -12, 12, 0);
        ctx.bezierCurveTo(20, 12, 6, 12, 0, 0);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.globalAlpha = watered ? 1 : 0.85;
        ctx.fill();
        ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(0, 4, 2, 0, 2 * Math.PI);
    ctx.arc(6, 4, 1.5, 0, 2 * Math.PI);
    ctx.arc(-6, 4, 1.5, 0, 2 * Math.PI);
    ctx.fillStyle = "#7a5a2f";
    ctx.fill();
    ctx.restore();
}

function updateStatus(msg, emoji = "") {
    statusDiv.textContent = `${emoji} ${msg}`;
}

plantBtn.onclick = function() {
    if (plot.planted && plot.stage < 3) {
        updateStatus("A plant is already growing! Water it to help it grow.", "⏳");
        return;
    }
    plot.planted = true;
    plot.type = seedSelect.value;
    plot.stage = 1;
    plot.watered = false;
    updateStatus(`Planted a ${PLANTS[plot.type].name}! Water it!`, PLANTS[plot.type].emoji);
    drawGarden();
};

waterBtn.onclick = function() {
    if (!plot.planted) {
        updateStatus("Nothing to water yet. Plant a seed first!", "💧");
        return;
    }
    if (plot.stage >= 3) {
        updateStatus("This plant is fully grown! Harvest it!", "🌼");
        return;
    }
    if (plot.watered) {
        updateStatus("Already watered! Wait for it to grow...", "💧");
        return;
    }
    plot.watered = true;
    waterSound.currentTime = 0;
    waterSound.play();
    animateWater(() => {
        plot.stage++;
        plot.watered = false;
        if (plot.stage >= 3) {
            updateStatus(`Your ${PLANTS[plot.type].name} has fully bloomed! Harvest it!`, "🌼");
        } else {
            updateStatus("It grew! Water again to help it bloom.", "💧");
        }
        drawGarden();
    });
};

function animateWater(onDone) {
    let dropY = 50;
    let dropX = 210 + (Math.random() - 0.5) * 18;
    function frame() {
        drawGarden();
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(dropX, dropY, 7, 14, 0, 0, Math.PI * 2);
        ctx.fillStyle = "#99e0ff";
        ctx.globalAlpha = 0.9;
        ctx.fill();
        ctx.restore();
        dropY += 15;
        if (dropY < 295) {
            requestAnimationFrame(frame);
        } else {
            setTimeout(onDone, 400);
        }
    }
    frame();
}

harvestBtn.onclick = function() {
    if (!plot.planted) {
        updateStatus("No plant to harvest! Plant a seed first.", "🌱");
        return;
    }
    if (plot.stage < 3) {
        updateStatus("Your plant isn't ready yet. Water it to help it grow!", "⏳");
        return;
    }
    harvestSound.currentTime = 0;
    harvestSound.play();
    animateHarvest(() => {
        updateStatus(`You harvested a beautiful ${PLANTS[plot.type].name}!`, PLANTS[plot.type].emoji);
        plot = {planted: false, type: null, stage: 0, watered: false};
        drawGarden();
    });
};

function animateHarvest(onDone) {
    let offset = 0;
    function frame() {
        drawGarden();
        ctx.save();
        ctx.translate(210, 295 - offset);
        if (plot.type === "tulip") drawTulip(ctx, 0, -55, PLANTS[plot.type].color);
        if (plot.type === "rose") drawRose(ctx, 0, -55, PLANTS[plot.type].color);
        if (plot.type === "sunflower") drawSunflower(ctx, 0, -55, PLANTS[plot.type].color);
        if (plot.type === "cherryblossom") drawCherryBlossom(ctx, 0, -55, PLANTS[plot.type].color);
        if (plot.type === "lily") drawLily(ctx, 0, -55, PLANTS[plot.type].color);
        if (plot.type === "cactus") drawCactus(ctx, 0, -45, PLANTS[plot.type].color);
        if (plot.type === "buns") drawBuns(ctx, 0, -45, PLANTS[plot.type].color);
        if (plot.type === "tree") drawTree(ctx, 0, -45, PLANTS[plot.type].color, true);
        if (plot.type === "daisy") drawDaisy(ctx, 0, -55, PLANTS[plot.type].color, true);
        if (plot.type === "bluebell") drawBluebell(ctx, 0, -55, PLANTS[plot.type].color, true);
        if (plot.type === "clover") drawClover(ctx, 0, -50, PLANTS[plot.type].color, true);
        if (plot.type === "peachblossom") drawPeachBlossom(ctx, 0, -55, PLANTS[plot.type].color, true);
        if (plot.type === "strawberry") drawStrawberry(ctx, 0, -52, PLANTS[plot.type].color, true);
        if (plot.type === "mint") drawMint(ctx, 0, -47, PLANTS[plot.type].color, true);
        if (plot.type === "pansy") drawPansy(ctx, 0, -55, PLANTS[plot.type].color, true);
        if (plot.type === "hydrangea") drawHydrangea(ctx, 0, -55, PLANTS[plot.type].color, true);
        if (plot.type === "forgetmenot") drawForgetMeNot(ctx, 0, -53, PLANTS[plot.type].color, true);
        if (plot.type === "marigold") drawMarigold(ctx, 0, -55, PLANTS[plot.type].color, true);
        if (plot.type === "morningglory") drawMorningGlory(ctx, 0, -55, PLANTS[plot.type].color, true);
        if (plot.type === "pumpkin") drawPumpkin(ctx, 0, -30, PLANTS[plot.type].color, true);
        if (plot.type === "bunnybloom") drawBunnyBloom(ctx, 0, -45, PLANTS[plot.type].color, true);
        ctx.restore();
        offset += 15;
        if (offset < 85) {
            requestAnimationFrame(frame);
        } else {
            setTimeout(onDone, 500);
        }
    }
    frame();
}

function ensureAllSeedsInSelect() {
    const present = new Set();
    for (let option of seedSelect.options) {
        present.add(option.value);
    }
    for (let key in PLANTS) {
        if (!present.has(key)) {
            const opt = document.createElement('option');
            opt.value = key;
            opt.textContent = `${PLANTS[key].emoji} ${PLANTS[key].name}`;
            seedSelect.appendChild(opt);
        }
    }
}

ensureAllSeedsInSelect();
drawGarden();
updateStatus("Choose a seed and click Plant to start your garden!", "🌱");
