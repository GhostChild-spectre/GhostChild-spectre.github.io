// Cutest Realistic Avatar Customizer JS

const skinTones = [
    "#fcebd4", // light
    "#f5d6b2", // light-medium
    "#deb887", // medium
    "#b4845c", // medium-dark
    "#6d4321"  // dark
];

const hairStyles = ["short", "long", "bun", "curly", "ponytail"];
const accessories = ["none", "glasses", "hat", "bow", "earrings"];

const avatarState = {
    skinToneIdx: 2,
    eyeColor: "#5b432a",
    hairStyle: "short",
    hairColor: "#1d1d1d",
    accessory: "none"
};

// Helper: Draw soft shadow
function drawShadow(ctx, x, y, w, h, blur, color) {
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
    ctx.ellipse(x, y, w, h, 0, 0, 2 * Math.PI);
    ctx.fillStyle = "#00000000";
    ctx.fill();
    ctx.restore();
}

function drawAvatar() {
    const canvas = document.getElementById('avatarCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Soft background
    ctx.save();
    ctx.beginPath();
    ctx.arc(150, 240, 130, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff4fc";
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();

    // Face shadow
    drawShadow(ctx, 150, 300, 70, 15, 25, "#eec1e1");

    // Draw face (round, slightly chubby)
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(150, 185, 85, 110, 0, 0, 2 * Math.PI);
    ctx.fillStyle = skinTones[avatarState.skinToneIdx];
    ctx.shadowColor = "#e4b1e7";
    ctx.shadowBlur = 16;
    ctx.fill();
    ctx.restore();

    // Cheeks (blush)
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.ellipse(105, 235, 24, 12, 0.07, 0, 2 * Math.PI);
    ctx.ellipse(195, 235, 24, 12, -0.07, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffb6b6";
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();

    // Ears
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(60, 185, 20, 33, 0, 0, 2 * Math.PI);
    ctx.ellipse(240, 185, 20, 33, 0, 0, 2 * Math.PI);
    ctx.fillStyle = skinTones[avatarState.skinToneIdx];
    ctx.fill();
    ctx.restore();

    // Draw eyes (big, cute)
    ctx.save();
    // Whites
    ctx.beginPath();
    ctx.ellipse(110, 205, 22, 16, 0, 0, 2 * Math.PI);
    ctx.ellipse(190, 205, 22, 16, 0, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();

    // Iris
    ctx.beginPath();
    ctx.ellipse(110, 205, 12, 12, 0, 0, 2 * Math.PI);
    ctx.ellipse(190, 205, 12, 12, 0, 0, 2 * Math.PI);
    ctx.fillStyle = avatarState.eyeColor;
    ctx.fill();

    // Pupils
    ctx.beginPath();
    ctx.ellipse(110, 205, 5, 6, 0, 0, 2 * Math.PI);
    ctx.ellipse(190, 205, 5, 6, 0, 0, 2 * Math.PI);
    ctx.fillStyle = "#232323";
    ctx.fill();

    // Eye shine
    ctx.beginPath();
    ctx.ellipse(106, 201, 3, 2, 0, 0, 2 * Math.PI);
    ctx.ellipse(186, 201, 3, 2, 0, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.globalAlpha = 0.8;
    ctx.fill();
    ctx.globalAlpha = 1;

    // Lower lashes (cute effect)
    ctx.beginPath();
    ctx.moveTo(97, 215);
    ctx.lineTo(104, 221);
    ctx.moveTo(122, 215);
    ctx.lineTo(116, 221);
    ctx.moveTo(177, 215);
    ctx.lineTo(184, 221);
    ctx.moveTo(202, 215);
    ctx.lineTo(196, 221);
    ctx.strokeStyle = "#ad6991";
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.restore();

    // Brows
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(95, 184);
    ctx.bezierCurveTo(110, 180, 120, 177, 130, 184);
    ctx.moveTo(170, 184);
    ctx.bezierCurveTo(180, 177, 190, 180, 205, 184);
    ctx.strokeStyle = "#a47c53";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.restore();

    // Cute nose
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(150, 228, 9, 4, 0, 0, Math.PI);
    ctx.strokeStyle = "#e1ad8a";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // Smile (soft, cute curve)
    ctx.save();
    ctx.beginPath();
    ctx.arc(150, 250, 22, 0.15 * Math.PI, 0.85 * Math.PI, false);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#e48e9b";
    ctx.stroke();
    ctx.restore();

    // Draw hair
    drawHair(ctx);

    // Draw accessory
    drawAccessory(ctx);
}

function drawHair(ctx) {
    ctx.save();
    ctx.fillStyle = avatarState.hairColor;
    ctx.strokeStyle = "#0002";
    // Extra shadow for realism
    ctx.shadowColor = "#d7b9f3";
    ctx.shadowBlur = 8;

    switch (avatarState.hairStyle) {
        case "short": {
            ctx.beginPath();
            ctx.ellipse(150, 110, 90, 55, 0, Math.PI, 2 * Math.PI);
            ctx.ellipse(150, 155, 62, 38, 0, 0.87 * Math.PI, 2.2 * Math.PI, false);
            ctx.fill();
            break;
        }
        case "long": {
            // Top
            ctx.beginPath();
            ctx.ellipse(150, 100, 85, 50, 0, Math.PI, 2 * Math.PI);
            ctx.fill();
            // Sides
            ctx.beginPath();
            ctx.moveTo(70, 170);
            ctx.bezierCurveTo(10, 280, 90, 340, 110, 350);
            ctx.bezierCurveTo(120, 360, 130, 270, 120, 200);
            ctx.closePath();
            ctx.moveTo(230, 170);
            ctx.bezierCurveTo(290, 280, 210, 340, 190, 350);
            ctx.bezierCurveTo(180, 360, 170, 270, 180, 200);
            ctx.closePath();
            ctx.fill();
            break;
        }
        case "bun": {
            // Bun
            ctx.beginPath();
            ctx.ellipse(190, 65, 28, 20, 0.2, 0, 2 * Math.PI);
            ctx.fill();
            // Hair cap
            ctx.beginPath();
            ctx.ellipse(150, 110, 90, 55, 0, Math.PI, 2 * Math.PI);
            ctx.fill();
            break;
        }
        case "curly": {
            // Top
            ctx.beginPath();
            ctx.ellipse(150, 110, 80, 48, 0, Math.PI, 2 * Math.PI);
            ctx.fill();
            // Curls
            for (let i = 0; i < 8; i++) {
                ctx.beginPath();
                ctx.arc(70 + i * 20, 150 + ((i % 2) ? 12 : 0), 16, 0, 2 * Math.PI);
                ctx.fill();
            }
            break;
        }
        case "ponytail": {
            // Hair cap
            ctx.beginPath();
            ctx.ellipse(150, 110, 90, 55, 0, Math.PI, 2 * Math.PI);
            ctx.fill();
            // Ponytail
            ctx.beginPath();
            ctx.ellipse(230, 300, 30, 85, 1.9, 0, 2 * Math.PI);
            ctx.fill();
            break;
        }
    }
    ctx.restore();
}

function drawAccessory(ctx) {
    switch (avatarState.accessory) {
        case "glasses":
            ctx.save();
            ctx.beginPath();
            ctx.arc(110, 205, 24, 0, 2 * Math.PI);
            ctx.arc(190, 205, 24, 0, 2 * Math.PI);
            ctx.moveTo(134, 205);
            ctx.lineTo(166, 205);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#7e54a2";
            ctx.shadowColor = "#ffb6b6";
            ctx.shadowBlur = 6;
            ctx.stroke();
            ctx.restore();
            break;
        case "hat":
            ctx.save();
            // Brim
            ctx.beginPath();
            ctx.ellipse(150, 74, 78, 18, 0, 0, 2 * Math.PI);
            ctx.fillStyle = "#fde8b0";
            ctx.globalAlpha = 0.7;
            ctx.fill();
            ctx.globalAlpha = 1;
            // Top
            ctx.beginPath();
            ctx.ellipse(150, 60, 55, 27, 0, 0, 2 * Math.PI);
            ctx.fillStyle = "#f7c873";
            ctx.fill();
            ctx.restore();
            break;
        case "bow":
            ctx.save();
            ctx.fillStyle = "#ff7eb9";
            ctx.shadowColor = "#ffb6b6";
            ctx.shadowBlur = 5;
            ctx.beginPath();
            ctx.ellipse(120, 80, 14, 17, Math.PI / 8, 0, Math.PI * 2);
            ctx.ellipse(180, 80, 14, 17, -Math.PI / 8, 0, Math.PI * 2);
            ctx.ellipse(150, 80, 11, 11, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            break;
        case "earrings":
            ctx.save();
            ctx.beginPath();
            ctx.arc(60, 215, 8, 0, 2 * Math.PI);
            ctx.arc(240, 215, 8, 0, 2 * Math.PI);
            ctx.fillStyle = "#e2d1f9";
            ctx.shadowColor = "#b07bac";
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.restore();
            break;
        default:
            // none
            break;
    }
}

function updateState() {
    avatarState.skinToneIdx = parseInt(document.getElementById('skinTone').value, 10);
    avatarState.eyeColor = document.getElementById('eyeColor').value;
    avatarState.hairStyle = document.getElementById('hairStyle').value;
    avatarState.hairColor = document.getElementById('hairColor').value;
    avatarState.accessory = document.getElementById('accessory').value;
    drawAvatar();
}

function randomizeAvatar() {
    avatarState.skinToneIdx = Math.floor(Math.random() * skinTones.length);
    const eyeColors = Array.from(document.getElementById('eyeColor').options).map(opt => opt.value);
    avatarState.eyeColor = eyeColors[Math.floor(Math.random() * eyeColors.length)];
    avatarState.hairStyle = hairStyles[Math.floor(Math.random() * hairStyles.length)];
    const hairColors = Array.from(document.getElementById('hairColor').options).map(opt => opt.value);
    avatarState.hairColor = hairColors[Math.floor(Math.random() * hairColors.length)];
    avatarState.accessory = accessories[Math.floor(Math.random() * accessories.length)];

    document.getElementById('skinTone').value = avatarState.skinToneIdx;
    document.getElementById('eyeColor').value = avatarState.eyeColor;
    document.getElementById('hairStyle').value = avatarState.hairStyle;
    document.getElementById('hairColor').value = avatarState.hairColor;
    document.getElementById('accessory').value = avatarState.accessory;
    drawAvatar();
}

document.getElementById('skinTone').addEventListener('input', updateState);
document.getElementById('eyeColor').addEventListener('change', updateState);
document.getElementById('hairStyle').addEventListener('change', updateState);
document.getElementById('hairColor').addEventListener('change', updateState);
document.getElementById('accessory').addEventListener('change', updateState);
document.getElementById('randomizeBtn').addEventListener('click', randomizeAvatar);

window.onload = drawAvatar;
