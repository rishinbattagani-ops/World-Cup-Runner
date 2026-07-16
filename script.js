// ================================
// World Cup Runner
// script.js
// PART 1 - Game Engine
// ================================

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const scoreText = document.getElementById("score");
const distanceText = document.getElementById("distance");

const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOver");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const finalScore = document.getElementById("finalScore");

//===============================
// Game Variables
//===============================

let running = false;
let gameOver = false;

let score = 0;
let distance = 0;

let worldSpeed = 7;
let gravity = 0.8;

//===============================
// Player
//===============================

const player = {

    x:120,
    y:320,

    width:55,
    height:80,

    color:"#1E90FF",

    velocityY:0,

    jumping:false,

    sliding:false,

    slideTimer:0

};

//===============================
// Controls
//===============================

const keys = {};

window.addEventListener("keydown",(e)=>{

    keys[e.key.toLowerCase()] = true;

    if(
        e.code==="Space" ||
        e.key==="ArrowUp" ||
        e.key==="w"
    ){
        jump();
    }

    if(
        e.key==="ArrowDown" ||
        e.key==="s"
    ){
        slide();
    }

});

window.addEventListener("keyup",(e)=>{

    keys[e.key.toLowerCase()] = false;

});

//===============================
// Start
//===============================

startBtn.onclick=()=>{

    startScreen.style.display="none";

    running=true;

};

restartBtn.onclick=()=>{

    location.reload();

};

//===============================
// Jump
//===============================

function jump(){

    if(player.jumping) return;

    player.velocityY=-16;

    player.jumping=true;

}

//===============================
// Slide
//===============================

function slide(){

    if(player.sliding) return;

    if(player.jumping) return;

    player.sliding=true;

    player.slideTimer=35;

    player.height=45;

    player.y=355;

}

//===============================
// Update Player
//===============================

function updatePlayer(){

    player.velocityY+=gravity;

    player.y+=player.velocityY;

    if(player.y>=320){

        player.y=320;

        player.velocityY=0;

        player.jumping=false;

    }

    if(player.sliding){

        player.slideTimer--;

        if(player.slideTimer<=0){

            player.sliding=false;

            player.height=80;

            player.y=320;

        }

    }

}

//===============================
// Draw Stadium
//===============================

function drawBackground(){

    // Sky

    ctx.fillStyle="#7ecbff";
    ctx.fillRect(0,0,WIDTH,HEIGHT);

    // Crowd

    ctx.fillStyle="#555";

    ctx.fillRect(0,50,WIDTH,120);

    for(let i=0;i<WIDTH;i+=20){

        ctx.fillStyle=i%40==0?"#ff4757":"#f1c40f";

        ctx.beginPath();

        ctx.arc(i+10,110,6,0,Math.PI*2);

        ctx.fill();

    }

    // Field

    ctx.fillStyle="#28a745";

    ctx.fillRect(0,170,WIDTH,330);

    // Grass lines

    ctx.strokeStyle="#3fd95d";

    for(let i=0;i<WIDTH;i+=60){

        ctx.beginPath();

        ctx.moveTo(i,170);

        ctx.lineTo(i+40,500);

        ctx.stroke();

    }

}

//===============================
// Draw Player
//===============================

function drawPlayer(){

    ctx.fillStyle=player.color;

    ctx.fillRect(

        player.x,
        player.y,
        player.width,
        player.height

    );

    // Head

    ctx.beginPath();

    ctx.fillStyle="#ffd39b";

    ctx.arc(

        player.x+27,

        player.y-15,

        15,

        0,

        Math.PI*2

    );

    ctx.fill();

}

//===============================
// HUD
//===============================

function updateHUD(){

    scoreText.textContent=score;

    distanceText.textContent=Math.floor(distance);

}

//===============================
// Main Update
//===============================

function update(){

    if(!running) return;

    if(gameOver) return;

    distance+=0.2;

    score=Math.floor(distance);

    updatePlayer();

    updateHUD();

}

//===============================
// Main Draw
//===============================

function draw(){

    drawBackground();

    drawPlayer();

}

//===============================
// Loop
//===============================

function loop(){

    update();

    draw();

    requestAnimationFrame(loop);

}

loop();
//==========================================
// PART 2
// World Objects + Collisions
// Add this BELOW Part 1
//==========================================

//-------------------------
// Arrays
//-------------------------

const soccerBalls = [];
const cones = [];

let spawnTimer = 0;

//-------------------------
// Spawn Functions
//-------------------------

function spawnBall(){

    soccerBalls.push({

        x: WIDTH + 50,

        y: Math.random() > 0.5 ? 290 : 220,

        radius:15

    });

}

function spawnCone(){

    cones.push({

        x: WIDTH + 60,

        y:355,

        width:35,

        height:45

    });

}

//-------------------------
// Update Objects
//-------------------------

function updateObjects(){

    spawnTimer++;

    if(spawnTimer>80){

        spawnTimer=0;

        if(Math.random()<0.6){

            spawnBall();

        }else{

            spawnCone();

        }

    }

    //-------------------
    // Soccer Balls
    //-------------------

    for(let i=soccerBalls.length-1;i>=0;i--){

        let ball=soccerBalls[i];

        ball.x-=worldSpeed;

        if(ball.x<-50){

            soccerBalls.splice(i,1);

            continue;

        }

        let dx=(player.x+player.width/2)-ball.x;
        let dy=(player.y+player.height/2)-ball.y;

        let dist=Math.sqrt(dx*dx+dy*dy);

        if(dist<35){

            soccerBalls.splice(i,1);

            score+=10;

        }

    }

    //-------------------
    // Cones
    //-------------------

    for(let i=cones.length-1;i>=0;i--){

        let cone=cones[i];

        cone.x-=worldSpeed;

        if(cone.x<-100){

            cones.splice(i,1);

            continue;

        }

        if(

            player.x < cone.x+cone.width &&
            player.x+player.width > cone.x &&
            player.y < cone.y+cone.height &&
            player.y+player.height > cone.y

        ){

            endGame();

        }

    }

}

//-------------------------
// Draw Objects
//-------------------------

function drawObjects(){

    //-------------------
    // Soccer Balls
    //-------------------

    soccerBalls.forEach(ball=>{

        ctx.fillStyle="white";

        ctx.beginPath();

        ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2);

        ctx.fill();

        ctx.strokeStyle="black";

        ctx.stroke();

        ctx.beginPath();

        ctx.arc(ball.x,ball.y,5,0,Math.PI*2);

        ctx.stroke();

    });

    //-------------------
    // Cones
    //-------------------

    cones.forEach(cone=>{

        ctx.fillStyle="orange";

        ctx.beginPath();

        ctx.moveTo(cone.x+cone.width/2,cone.y);

        ctx.lineTo(cone.x,cone.y+cone.height);

        ctx.lineTo(cone.x+cone.width,cone.y+cone.height);

        ctx.closePath();

        ctx.fill();

    });

}

//-------------------------
// Game Over
//-------------------------

function endGame(){

    running=false;

    gameOver=true;

    finalScore.textContent=score;

    gameOverScreen.style.display="flex";

}

//-------------------------
// Patch Existing Functions
//-------------------------

const oldUpdate = update;

update = function(){

    oldUpdate();

    if(!running) return;

    updateObjects();

    worldSpeed += 0.0005;

};

const oldDraw = draw;

draw = function(){

    oldDraw();

    drawObjects();

};
