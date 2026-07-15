// WORLD CUP RUNNER V3
// PART 1

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const GROUND = 470;
const GRAVITY = 0.8;

let score = 0;

const keys = {};

document.addEventListener("keydown", e => {
    keys[e.key] = true;
});

document.addEventListener("keyup", e => {
    keys[e.key] = false;
});

const player = {
    x: 150,
    y: GROUND,
    w: 50,
    h: 90,

    vy: 0,

    jumping: false,
    sliding: false,

    speed: 6
};

function updatePlayer(){

    if(keys["ArrowLeft"]){
        player.x -= player.speed;
    }

    if(keys["ArrowRight"]){
        player.x += player.speed;
    }

    if(keys["ArrowUp"] && !player.jumping){
        player.vy = -16;
        player.jumping = true;
    }

    player.sliding = keys["ArrowDown"];

    player.vy += GRAVITY;
    player.y += player.vy;

    if(player.y > GROUND){
        player.y = GROUND;
        player.vy = 0;
        player.jumping = false;
    }

    if(player.x < 0){
        player.x = 0;
    }

    if(player.x + player.w > WIDTH){
        player.x = WIDTH - player.w;
    }
}

function drawBackground(){

    ctx.fillStyle="#7ec8ff";
    ctx.fillRect(0,0,WIDTH,HEIGHT);

    ctx.fillStyle="#808080";
    ctx.fillRect(0,0,WIDTH,120);

    for(let i=0;i<WIDTH;i+=25){

        ctx.fillStyle=i%50==0?"#ff4040":"white";

        ctx.fillRect(i,20,25,18);
    }

    for(let i=0;i<HEIGHT;i+=60){

        ctx.fillStyle=i%120==0?"#5fbf5f":"#63c74d";

        ctx.fillRect(0,i,WIDTH,60);
    }

    ctx.strokeStyle="white";
    ctx.lineWidth=5;

    ctx.beginPath();
    ctx.moveTo(WIDTH/2,120);
    ctx.lineTo(WIDTH/2,HEIGHT);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(WIDTH/2,HEIGHT/2+40,70,0,Math.PI*2);
    ctx.stroke();
}
// WORLD CUP RUNNER V3
// PART 2

function drawPlayer(){

    let h = player.h;

    if(player.sliding){
        h = 50;
    }

    // Body
    ctx.fillStyle="#d62828";
    ctx.fillRect(
        player.x,
        player.y + (player.h-h),
        player.w,
        h
    );

    // Head
    ctx.fillStyle="#ffd6a5";
    ctx.beginPath();
    ctx.arc(
        player.x + player.w/2,
        player.y - 15,
        15,
        0,
        Math.PI*2
    );
    ctx.fill();

    // Jersey stripe
    ctx.fillStyle="white";
    ctx.fillRect(
        player.x + 20,
        player.y + (player.h-h),
        10,
        h
    );
}

function drawHUD(){

    ctx.fillStyle="white";
    ctx.font="28px Arial";
    ctx.fillText("Score: " + score,20,40);
}

function updateGame(){

    score++;

    updatePlayer();
}

function drawGame(){

    drawBackground();

    drawPlayer();

    drawHUD();
}

function gameLoop(){

    updateGame();

    drawGame();

    requestAnimationFrame(gameLoop);
}

gameLoop();
// =========================
// SOCCER BALLS
// =========================

const balls = [];

function spawnBall() {

    balls.push({
        x: WIDTH + 50,
        y: Math.random() * 250 + 180,
        r: 15
    });

}

const oldUpdate = updateGame;

updateGame = function () {

    oldUpdate();

    if (score % 180 === 0) {
        spawnBall();
    }

    for (let i = balls.length - 1; i >= 0; i--) {

        balls[i].x -= 5;

        if (balls[i].x < -30) {
            balls.splice(i, 1);
            continue;
        }

        if (
            balls[i].x > player.x &&
            balls[i].x < player.x + player.w &&
            balls[i].y > player.y &&
            balls[i].y < player.y + player.h
        ) {

            score += 200;
            balls.splice(i, 1);
        }
    }

};

const oldDraw = drawGame;

drawGame = function () {

    oldDraw();

    balls.forEach(ball => {

        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, 4, 0, Math.PI * 2);
        ctx.fill();

    });

};
