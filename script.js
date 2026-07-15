// =======================================
// WORLD CUP RUNNER V3
// Part 1
// =======================================

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

let score = 0;
let frame = 0;

const keys = {};

document.addEventListener("keydown", e => {
    keys[e.key] = true;
});

document.addEventListener("keyup", e => {
    keys[e.key] = false;
});

const player = {
    x: 150,
    y: 360,
    width: 50,
    height: 90,

    vx: 0,
    vy: 0,

    jumping: false,
    sliding: false,

    speed: 6
};

const gravity = 0.7;
const ground = 360;

function updatePlayer(){

    if(keys["ArrowLeft"]){
        player.x -= player.speed;
    }

    if(keys["ArrowRight"]){
        player.x += player.speed;
    }

    if(keys["ArrowUp"] && !player.jumping){
        player.vy = -14;
        player.jumping = true;
    }

    player.sliding = keys["ArrowDown"];

    player.vy += gravity;
    player.y += player.vy;

    if(player.y >= ground){
        player.y = ground;
        player.vy = 0;
        player.jumping = false;
    }

    if(player.x < 0) player.x = 0;
    if(player.x + player.width > WIDTH)
        player.x = WIDTH - player.width;
}

function drawSky(){

    ctx.fillStyle="#87CEEB";
    ctx.fillRect(0,0,WIDTH,HEIGHT);
}

function drawGrass(){

    for(let i=0;i<12;i++){

        ctx.fillStyle =
            i%2==0 ? "#63c74d" : "#5db84a";

        ctx.fillRect(
            0,
            i*50,
            WIDTH,
            50
        );
    }
}

function drawFieldLines(){

    ctx.strokeStyle="white";
    ctx.lineWidth=5;

    ctx.beginPath();
    ctx.moveTo(WIDTH/2,0);
    ctx.lineTo(WIDTH/2,HEIGHT);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(
        WIDTH/2,
        HEIGHT/2,
        70,
        0,
        Math.PI*2
    );
    ctx.stroke();
}

function drawPlayer(){

    let h = player.height;

    if(player.sliding){
        h = 55;
    }

    ctx.fillStyle="red";

    ctx.fillRect(
        player.x,
        player.y + (player.height-h),
        player.width,
        h
    );

    ctx.fillStyle="white";

    ctx.beginPath();

    ctx.arc(
        player.x+25,
        player.y-15,
        15,
        0,
        Math.PI*2
    );

    ctx.fill();
}// =======================================
// WORLD CUP RUNNER V3
// Part 2
// =======================================

function drawStadium() {

    ctx.fillStyle = "#8b8b8b";
    ctx.fillRect(0, 0, WIDTH, 110);

    for (let i = 0; i < WIDTH; i += 20) {
        ctx.fillStyle = i % 40 === 0 ? "#ff4444" : "#ffffff";
        ctx.fillRect(i, 20, 20, 15);
    }

    ctx.fillStyle = "#444";
    ctx.fillRect(0, 110, WIDTH, 10);
}

function drawGoal() {

    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;

    ctx.strokeRect(WIDTH / 2 - 60, 120, 120, 70);

    for (let x = WIDTH / 2 - 60; x <= WIDTH / 2 + 60; x += 15) {
        ctx.beginPath();
        ctx.moveTo(x, 120);
        ctx.lineTo(x, 190);
        ctx.stroke();
    }

    for (let y = 120; y <= 190; y += 15) {
        ctx.beginPath();
        ctx.moveTo(WIDTH / 2 - 60, y);
        ctx.lineTo(WIDTH / 2 + 60, y);
        ctx.stroke();
    }
}

function drawHUD() {

    ctx.fillStyle = "white";
    ctx.font = "28px Arial";
    ctx.fillText("Score: " + score, 20, 40);
}

function updateGame() {

    frame++;
    score++;

    updatePlayer();
}

function drawGame() {

    drawSky();
    drawGrass();
    drawFieldLines();
    drawStadium();
    drawGoal();
    drawPlayer();
    drawHUD();
}

function gameLoop() {

    updateGame();
    drawGame();

    requestAnimationFrame(gameLoop);
}

gameLoop();
