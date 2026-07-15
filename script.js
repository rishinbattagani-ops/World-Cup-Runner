const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("scoreValue");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const lanes = [380, 500, 620];

let score = 0;
let roadOffset = 0;

const player = {
    lane: 1,
    x: 500,
    y: 455,
    targetX: 500
};

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowLeft" && player.lane>0){
        player.lane--;
    }

    if(e.key==="ArrowRight" && player.lane<2){
        player.lane++;
    }

});

function drawSky(){

    const sky = ctx.createLinearGradient(0,0,0,HEIGHT);

    sky.addColorStop(0,"#5ec8ff");
    sky.addColorStop(1,"#dff8ff");

    ctx.fillStyle = sky;
    ctx.fillRect(0,0,WIDTH,HEIGHT);

    // Sun
    ctx.fillStyle="#FFD84D";
    ctx.beginPath();
    ctx.arc(900,90,45,0,Math.PI*2);
    ctx.fill();

}

function drawCloud(x,y){

    ctx.fillStyle="white";

    ctx.beginPath();
    ctx.arc(x,y,22,0,Math.PI*2);
    ctx.arc(x+24,y-10,28,0,Math.PI*2);
    ctx.arc(x+54,y,22,0,Math.PI*2);
    ctx.fill();

}

function drawRoad(){

    ctx.fillStyle="#42c857";
    ctx.fillRect(0,430,WIDTH,170);

    ctx.fillStyle="#555";

    ctx.beginPath();
    ctx.moveTo(250,600);
    ctx.lineTo(750,600);
    ctx.lineTo(610,80);
    ctx.lineTo(390,80);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle="gold";
    ctx.lineWidth=5;

    ctx.beginPath();
    ctx.moveTo(250,600);
    ctx.lineTo(390,80);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(750,600);
    ctx.lineTo(610,80);
    ctx.stroke();

    ctx.strokeStyle="white";
    ctx.lineWidth=4;

    for(let i=0;i<20;i++){

        let y=600-(i*45)+(roadOffset%45);

        let t=(600-y)/520;

        let w=500-(t*280);

        ctx.beginPath();
        ctx.moveTo(500-w/6,y);
        ctx.lineTo(500-w/6,y-25);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(500+w/6,y);
        ctx.lineTo(500+w/6,y-25);
        ctx.stroke();

    }

    roadOffset += 10;

}

function drawPlayer(){

    player.targetX = lanes[player.lane];

    player.x += (player.targetX-player.x)*0.15;

    // Shadow
    ctx.fillStyle="rgba(0,0,0,.25)";
    ctx.beginPath();
    ctx.ellipse(player.x,425,28,10,0,0,Math.PI*2);
    ctx.fill();

    // Legs
    ctx.strokeStyle="black";
    ctx.lineWidth=5;

    ctx.beginPath();
    ctx.moveTo(player.x-8,390);
    ctx.lineTo(player.x-16,430);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(player.x+8,390);
    ctx.lineTo(player.x+16,430);
    ctx.stroke();

    // Pants
    ctx.fillStyle="#7d4cff";
    ctx.fillRect(player.x-18,350,36,42);

    // Shirt
    ctx.fillStyle="#d60000";
    ctx.fillRect(player.x-22,295,44,58);

    // Arms
    ctx.beginPath();
    ctx.moveTo(player.x-22,305);
    ctx.lineTo(player.x-40,330);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(player.x+22,305);
    ctx.lineTo(player.x+40,330);
    ctx.stroke();

    // Neck
    ctx.fillStyle="#f2c8a0";
    ctx.fillRect(player.x-6,285,12,12);

    // Head
    ctx.beginPath();
    ctx.arc(player.x,265,22,0,Math.PI*2);
    ctx.fill();

    // Hair
    ctx.fillStyle="black";
    ctx.beginPath();
    ctx.arc(player.x,258,24,Math.PI,0);
    ctx.fill();

    // Hat
    ctx.fillStyle="#c40000";
    ctx.fillRect(player.x-34,232,68,18);

    ctx.fillStyle="white";
    ctx.font="8px Arial";
    ctx.fillText("WORLD CUP",player.x-28,243);
    ctx.fillText("EDITION",player.x-20,251);

}

function update(){

    score++;

    scoreText.textContent = score;

}

function render(){

    drawSky();

    drawCloud((roadOffset*0.3)%1200-100,90);
    drawCloud(((roadOffset*0.3)+300)%1200-100,140);
    drawCloud(((roadOffset*0.3)+700)%1200-100,110);

    drawRoad();

    drawPlayer();

}

function gameLoop(){

    update();

    render();

    requestAnimationFrame(gameLoop);

}

gameLoop();
//==============================
// RISHI'S RUNNER V2
// World Cup Edition
// Part 1
//==============================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 600;

const scoreText = document.getElementById("scoreValue");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

let score = 0;
let roadScroll = 0;
let frame = 0;

const lanes = [380,500,620];

const player = {

    lane:1,

    x:500,

    targetX:500,

    y:455,

    width:55,

    height:110,

    velocityY:0,

    jumping:false,

    sliding:false,

    slideTimer:0

};

const gravity = 0.9;

document.addEventListener("keydown",e=>{

    if(e.key==="ArrowLeft" && player.lane>0){

        player.lane--;

    }

    if(e.key==="ArrowRight" && player.lane<2){

        player.lane++;

    }

    if(e.key==="ArrowUp" && !player.jumping){

        player.jumping=true;

        player.velocityY=-17;

    }

    if(e.key==="ArrowDown" && !player.sliding){

        player.sliding=true;

        player.slideTimer=28;

    }

});

function drawSky(){

    const sky=ctx.createLinearGradient(0,0,0,HEIGHT);

    sky.addColorStop(0,"#63cfff");

    sky.addColorStop(.6,"#9fe2ff");

    sky.addColorStop(1,"#ecfbff");

    ctx.fillStyle=sky;

    ctx.fillRect(0,0,WIDTH,HEIGHT);

    ctx.fillStyle="#FFD84D";

    ctx.beginPath();

    ctx.arc(880,90,45,0,Math.PI*2);

    ctx.fill();

}

function drawCloud(x,y,s){

    ctx.fillStyle="white";

    ctx.beginPath();

    ctx.arc(x,y,s,0,Math.PI*2);

    ctx.arc(x+s,y-s/2,s*1.2,0,Math.PI*2);

    ctx.arc(x+s*2.2,y,s,0,Math.PI*2);

    ctx.fill();

}

function drawBackground(){

    drawSky();

    drawCloud((frame*.35)%1200-150,80,24);

    drawCloud(((frame*.35)+320)%1200-150,140,20);

    drawCloud(((frame*.35)+700)%1200-150,100,28);

    ctx.fillStyle="#45c857";

    ctx.fillRect(0,430,1000,170);

}

function drawRoad(){

    ctx.fillStyle="#4d4d4d";

    ctx.beginPath();

    ctx.moveTo(180,600);

    ctx.lineTo(820,600);

    ctx.lineTo(590,20);

    ctx.lineTo(410,20);

    ctx.closePath();

    ctx.fill();

    ctx.strokeStyle="#FFD000";

    ctx.lineWidth=5;

    ctx.beginPath();

    ctx.moveTo(180,600);

    ctx.lineTo(410,20);

    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(820,600);

    ctx.lineTo(590,20);

    ctx.stroke();

    ctx.strokeStyle="white";

    ctx.lineWidth=5;

    for(let i=0;i<26;i++){

        let y=620-(i*38)+(roadScroll%38);

        let t=(620-y)/600;

        let roadWidth=640-(t*460);

        let left=500-roadWidth/6;

        let right=500+roadWidth/6;

        ctx.beginPath();

        ctx.moveTo(left,y);

        ctx.lineTo(left,y-34);

        ctx.stroke();

        ctx.beginPath();

        ctx.moveTo(right,y);

        ctx.lineTo(right,y-34);

        ctx.stroke();

    }

    roadScroll+=12;

}function drawPlayer(){

    player.targetX = lanes[player.lane];
    player.x += (player.targetX-player.x)*0.16;

    // Jump Physics
    if(player.jumping){

        player.velocityY += gravity;
        player.y += player.velocityY;

        if(player.y >= 455){

            player.y = 455;
            player.velocityY = 0;
            player.jumping = false;

        }

    }

    // Slide Timer
    if(player.sliding){

        player.slideTimer--;

        if(player.slideTimer <= 0){

            player.sliding = false;

        }

    }

    const run = Math.sin(frame*0.25)*6;

    // Shadow
    ctx.fillStyle="rgba(0,0,0,.25)";
    ctx.beginPath();
    ctx.ellipse(player.x,430,30,10,0,0,Math.PI*2);
    ctx.fill();

    ctx.strokeStyle="black";
    ctx.lineWidth=5;

    if(player.sliding){

        // Legs
        ctx.beginPath();
        ctx.moveTo(player.x-18,player.y-35);
        ctx.lineTo(player.x+18,player.y-18);
        ctx.stroke();

        // Body
        ctx.fillStyle="#d60000";
        ctx.fillRect(player.x-34,player.y-78,68,28);

        // Pants
        ctx.fillStyle="#7d4cff";
        ctx.fillRect(player.x-30,player.y-52,60,20);

        // Head
        ctx.fillStyle="#f2c8a0";
        ctx.beginPath();
        ctx.arc(player.x+24,player.y-70,18,0,Math.PI*2);
        ctx.fill();

        // Hair
        ctx.fillStyle="black";
        ctx.beginPath();
        ctx.arc(player.x+24,player.y-74,20,Math.PI,0);
        ctx.fill();

        // Hat
        ctx.fillStyle="#c40000";
        ctx.fillRect(player.x,player.y-94,42,12);

    }else{

        // Legs
        ctx.beginPath();
        ctx.moveTo(player.x-8,player.y-65);
        ctx.lineTo(player.x-16,player.y-25+run);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(player.x+8,player.y-65);
        ctx.lineTo(player.x+16,player.y-25-run);
        ctx.stroke();

        // Pants
        ctx.fillStyle="#7d4cff";
        ctx.fillRect(player.x-18,player.y-105,36,42);

        // Shirt
        ctx.fillStyle="#d60000";
        ctx.fillRect(player.x-22,player.y-160,44,58);

        // Arms
        ctx.beginPath();
        ctx.moveTo(player.x-22,player.y-150);
        ctx.lineTo(player.x-38,player.y-125-run);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(player.x+22,player.y-150);
        ctx.lineTo(player.x+38,player.y-125+run);
        ctx.stroke();

        // Neck
        ctx.fillStyle="#f2c8a0";
        ctx.fillRect(player.x-6,player.y-170,12,12);

        // Head
        ctx.beginPath();
        ctx.arc(player.x,player.y-190,22,0,Math.PI*2);
        ctx.fill();

        // Hair
        ctx.fillStyle="black";
        ctx.beginPath();
        ctx.arc(player.x,player.y-197,24,Math.PI,0);
        ctx.fill();

        // Hat
        ctx.fillStyle="#c40000";
        ctx.fillRect(player.x-34,player.y-223,68,18);

        ctx.fillStyle="white";
        ctx.font="8px Arial";
        ctx.fillText("WORLD CUP",player.x-28,player.y-212);
        ctx.fillText("EDITION",player.x-20,player.y-204);

    }

}

function update(){

    score++;
    scoreText.textContent = score;
    frame++;

}

function render(){

    drawBackground();
    drawRoad();
    drawPlayer();

}

function gameLoop(){

    update();
    render();

    requestAnimationFrame(gameLoop);

}

gameLoop();
