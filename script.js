// ======================================
// WORLD CUP RUNNER
// SCRIPT.JS
// PART 1
// ======================================

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const GROUND = HEIGHT - 110;
const GRAVITY = 0.8;

let score = 0;
let gameOver = false;
let frame = 0;

const keys = {};

document.addEventListener("keydown", e => {
    keys[e.key] = true;

    if (gameOver && e.key === " ") {
        restartGame();
    }
});

document.addEventListener("keyup", e => {
    keys[e.key] = false;
});

const player = {

    x:150,
    y:GROUND,

    w:50,
    h:90,

    vy:0,

    jumping:false,
    sliding:false,

    speed:6

};

const balls = [];
const cones = [];

function restartGame(){

    score = 0;
    frame = 0;

    gameOver = false;

    balls.length = 0;
    cones.length = 0;

    player.x = 150;
    player.y = GROUND;
    player.vy = 0;
    player.jumping = false;
    player.sliding = false;

}

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

        player.x = WIDTH-player.w;

    }

}
// ======================================
// WORLD CUP RUNNER
// SCRIPT.JS
// PART 2
// ======================================

function drawBackground(){

    // Sky
    ctx.fillStyle="#7ec8ff";
    ctx.fillRect(0,0,WIDTH,HEIGHT);

    // Stadium
    ctx.fillStyle="#888";
    ctx.fillRect(0,0,WIDTH,120);

    for(let x=0;x<WIDTH;x+=25){

        ctx.fillStyle=(x/25)%2===0?"#ffffff":"#ff4040";
        ctx.fillRect(x,20,25,18);

    }

    // Grass stripes
    for(let y=120;y<HEIGHT;y+=50){

        ctx.fillStyle=((y/50)%2===0)?"#63c74d":"#59b846";
        ctx.fillRect(0,y,WIDTH,50);

    }

    // Halfway line
    ctx.strokeStyle="white";
    ctx.lineWidth=5;

    ctx.beginPath();
    ctx.moveTo(WIDTH/2,120);
    ctx.lineTo(WIDTH/2,HEIGHT);
    ctx.stroke();

    // Center circle
    ctx.beginPath();
    ctx.arc(WIDTH/2,HEIGHT/2+30,70,0,Math.PI*2);
    ctx.stroke();
}

function drawPlayer(){

    let h=player.h;

    if(player.sliding){

        h=50;

    }

    // Body
    ctx.fillStyle="#d62828";
    ctx.fillRect(
        player.x,
        player.y+(player.h-h),
        player.w,
        h
    );

    // Head
    ctx.fillStyle="#ffd6a5";

    ctx.beginPath();
    ctx.arc(
        player.x+player.w/2,
        player.y-15,
        15,
        0,
        Math.PI*2
    );

    ctx.fill();

    // Jersey stripe
    ctx.fillStyle="white";

    ctx.fillRect(
        player.x+20,
        player.y+(player.h-h),
        10,
        h
    );
}

function spawnBall(){

    balls.push({

        x:WIDTH+40,

        y:Math.random()*220+170,

        r:15,

        speed:5

    });

}

function spawnCone(){

    cones.push({

        x:WIDTH+40,

        y:GROUND+50,

        w:35,

        h:55,

        speed:6

    });

}
// ======================================
// WORLD CUP RUNNER
// SCRIPT.JS
// PART 3
// ======================================

function updateBalls(){

    if(frame % 120 === 0){

        spawnBall();

    }

    for(let i=balls.length-1;i>=0;i--){

        const b=balls[i];

        b.x-=b.speed;

        if(b.x<-30){

            balls.splice(i,1);
            continue;

        }

        const dx=(player.x+player.w/2)-b.x;
        const dy=(player.y+player.h/2)-b.y;

        if(Math.sqrt(dx*dx+dy*dy)<30){

            score+=100;

            balls.splice(i,1);

        }

    }

}

function updateCones(){

    if(frame % 180 === 0){

        spawnCone();

    }

    for(let i=cones.length-1;i>=0;i--){

        const c=cones[i];

        c.x-=c.speed;

        if(c.x<-50){

            cones.splice(i,1);
            continue;

        }

        if(

            player.x < c.x+c.w &&
            player.x+player.w > c.x &&
            player.y+player.h > c.y &&
            player.y < c.y+c.h

        ){

            gameOver=true;

        }

    }

}

function drawBalls(){

    balls.forEach(b=>{

        ctx.beginPath();
        ctx.fillStyle="white";
        ctx.arc(b.x,b.y,b.r,0,Math.PI*2);
        ctx.fill();

        ctx.strokeStyle="black";
        ctx.lineWidth=2;
        ctx.stroke();

        ctx.fillStyle="black";
        ctx.beginPath();
        ctx.arc(b.x,b.y,4,0,Math.PI*2);
        ctx.fill();

    });

}

function drawCones(){

    cones.forEach(c=>{

        ctx.fillStyle="orange";
        ctx.fillRect(c.x,c.y,c.w,c.h);

        ctx.fillStyle="white";

        ctx.fillRect(c.x,c.y+15,c.w,5);
        ctx.fillRect(c.x,c.y+30,c.w,5);

    });

}

function drawHUD(){

    ctx.fillStyle="white";
    ctx.font="28px Arial";

    ctx.fillText("Score: "+score,20,40);

}

function drawGameOver(){

    if(!gameOver) return;

    ctx.fillStyle="rgba(0,0,0,.55)";
    ctx.fillRect(0,0,WIDTH,HEIGHT);

    ctx.fillStyle="white";
    ctx.font="60px Arial";
    ctx.fillText("GAME OVER",WIDTH/2-180,220);

    ctx.font="28px Arial";
    ctx.fillText("Press SPACE to Restart",WIDTH/2-150,280);

}
// ======================================
// WORLD CUP RUNNER
// SCRIPT.JS
// PART 4 (FINAL)
// ======================================

function updateGame(){

    if(gameOver){
        return;
    }

    frame++;
    score++;

    updatePlayer();
    updateBalls();
    updateCones();

}

function drawGame(){

    drawBackground();

    drawBalls();

    drawCones();

    drawPlayer();

    drawHUD();

    drawGameOver();

}

function gameLoop(){

    updateGame();

    drawGame();

    requestAnimationFrame(gameLoop);

}

gameLoop();
